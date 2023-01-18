import React, { useEffect, useRef, useState } from "react";
import useEventListener from "@use-it/event-listener";
import * as constants from "./helpers";
import { Modal } from "antd";
import { createSounds } from "../SoundPanel/createSounds";
import { SoundPanel } from "../SoundPanel/SoundPanel";
import { addScore } from "@/services/leaderboard";
import { useAppSelector } from "@/store/hooks";
import { userSelectors } from "@/store/slices/user/userSlice";

//TODO: положить саунды и аудиоконтекст в стор при загрузке приложения. Иначе долго грузится.
const { soundElements, audioContext } = createSounds();

interface Shape {
    x: number;
    y: number;
}

interface Circle extends Shape {
    radius: number;
}

interface Rectangle extends Shape {
    width: number;
    height: number;
}

// ground
let groundX = 0;

// bird
const birdX = 60;
let birdY = 120;
let birdYSpeed = 0;

// pipes
let pipeGapBottomY = constants.PIPE_HEIGHT;
let pipeGapBottomYSecond = constants.PIPE_HEIGHT;
let pipeGapBottomYThird = constants.PIPE_HEIGHT;
let pipeX = constants.CANVAS_WIDTH;
let pipeXSecond = constants.CANVAS_WIDTH - constants.CANVAS_WIDTH / 3;
let pipeXThird = constants.CANVAS_WIDTH - (constants.CANVAS_WIDTH / 3) * 2;

// score
let score = 0;
let bestScore: number = parseInt(localStorage.getItem("bestScore") || "0");

const checkCollision = (circle: Circle, rect: Rectangle) => {
    if (
        circle.x + circle.radius >= rect.x &&
        circle.x - circle.radius <= rect.x + rect.width
    ) {
        if (
            circle.y + circle.radius >= rect.y &&
            circle.y - circle.radius <= rect.y + rect.height
        ) {
            // TODO: IMPROVE COLLISION CHECK
            return true;
        }
    }
    return false;
};

const touchedPipe = () => {
    const birdHitbox: Circle = {
        x: birdX + constants.BIRD_WIDTH / 2,
        y: birdY + constants.BIRD_HEIGHT / 2 + 5,
        radius: 20,
    };

    const upperPipe: Rectangle = {
        x: pipeX,
        y: 0,
        width: constants.PIPE_WIDTH,
        height: pipeGapBottomY,
    };

    const lowerPipe: Rectangle = {
        x: pipeX,
        y: pipeGapBottomY + constants.PIPE_GAP,
        width: constants.PIPE_WIDTH,
        height:
            constants.CANVAS_HEIGHT -
            constants.HEIGHT_GROUND -
            (pipeGapBottomY + constants.PIPE_GAP),
    };

    const upperPipeSecond: Rectangle = {
        x: pipeXSecond,
        y: 0,
        width: constants.PIPE_WIDTH,
        height: pipeGapBottomYSecond,
    };

    const lowerPipeSecond: Rectangle = {
        x: pipeXSecond,
        y: pipeGapBottomYSecond + constants.PIPE_GAP,
        width: constants.PIPE_WIDTH,
        height:
            constants.CANVAS_HEIGHT -
            constants.HEIGHT_GROUND -
            (pipeGapBottomYSecond + constants.PIPE_GAP),
    };

    const upperPipeThird: Rectangle = {
        x: pipeXThird,
        y: 0,
        width: constants.PIPE_WIDTH,
        height: pipeGapBottomYThird,
    };

    const lowerPipeThird: Rectangle = {
        x: pipeXThird,
        y: pipeGapBottomYThird + constants.PIPE_GAP,
        width: constants.PIPE_WIDTH,
        height:
            constants.CANVAS_HEIGHT -
            constants.HEIGHT_GROUND -
            (pipeGapBottomYThird + constants.PIPE_GAP),
    };

    return (
        checkCollision(birdHitbox, upperPipe) ||
        checkCollision(birdHitbox, lowerPipe) ||
        checkCollision(birdHitbox, upperPipeSecond) ||
        checkCollision(birdHitbox, lowerPipeSecond) ||
        checkCollision(birdHitbox, upperPipeThird) ||
        checkCollision(birdHitbox, lowerPipeThird)
    );
};

const fallOut = () =>
    birdY + constants.BIRD_HEIGHT >
    constants.CANVAS_HEIGHT - constants.HEIGHT_GROUND;

const reset = () => {
    hasStarted = false;
    hasFinished = true;
};

let hasStarted = false;
let hasFinished = false;
let canGetScore = true;

const Game = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(true);
    const canvas = useRef<HTMLCanvasElement>(null);

    const { user } = useAppSelector(userSelectors.all);

    // bird jump
    const jump = () => {
        if (isReady) {
            setIsReady(false);
        }
        const isSoundEnabled = JSON.parse(
            localStorage.getItem("soundIsEnabled") || String(false)
        );

        if (isSoundEnabled && audioContext.state === "suspended") {
            audioContext.resume();
        }

        if (hasFinished) {
            return;
        }

        if (!hasStarted) {
            hasStarted = true;
        }

        birdYSpeed = constants.JUMP_SPEED;
        soundElements.wing.play();
    };

    // enable space button
    const handler = (key: any) => {
        if (hasFinished) {
            return;
        }
        if (key.code === "Space") {
            if (!hasStarted) {
                hasStarted = true;
            }
            jump();
        }
    };

    useEventListener("keypress", handler, window);

    const draw = (context: CanvasRenderingContext2D) => {
        // draw background
        context.fillStyle = "#abfcff";
        context.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

        // draw clouds
        context.drawImage(
            constants.CLOUDS,
            constants.CLOUDS_X,
            constants.CLOUDS_Y,
            constants.CLOUDS_WIDTH,
            constants.CLOUDS_HEIGHT
        );

        context.drawImage(
            constants.CLOUDSROTATE,
            constants.CLOUDS_XROTATE,
            constants.CLOUDS_YROTATE,
            constants.CLOUDS_WIDTH,
            constants.CLOUDS_HEIGHT
        );

        context.drawImage(
            constants.CLOUDSTHIRD,
            constants.CLOUDS_XTHIRD,
            constants.CLOUDS_YTHIRD,
            constants.CLOUDS_WIDTH,
            constants.CLOUDS_HEIGHT
        );

        // draw ground
        context.drawImage(
            constants.GROUND,
            groundX,
            constants.GROUND_Y,
            constants.GROUND_WIDTH,
            constants.GROUND_HEIGHT
        );
        context.drawImage(
            constants.GROUND,
            groundX + constants.CANVAS_WIDTH,
            constants.GROUND_Y,
            constants.GROUND_WIDTH,
            constants.GROUND_HEIGHT
        );

        // draw bird
        context.drawImage(
            constants.BIRD,
            birdX,
            birdY,
            constants.BIRD_WIDTH,
            constants.BIRD_HEIGHT
        );

        // draw pipes
        context.drawImage(
            constants.PIPEROTATE,
            pipeX,
            0,
            constants.PIPE_WIDTH,
            pipeGapBottomY
        );

        context.drawImage(
            constants.PIPE,
            pipeX,
            pipeGapBottomY + constants.PIPE_GAP,
            constants.PIPE_WIDTH,
            constants.CANVAS_HEIGHT -
                constants.HEIGHT_GROUND -
                (pipeGapBottomY + constants.PIPE_GAP)
        );

        //draw second Pipes
        context.drawImage(
            constants.PIPEROTATE,
            pipeXSecond,
            0,
            constants.PIPE_WIDTH,
            pipeGapBottomYSecond
        );

        context.drawImage(
            constants.PIPE,
            pipeXSecond,
            pipeGapBottomYSecond + constants.PIPE_GAP,
            constants.PIPE_WIDTH,
            constants.CANVAS_HEIGHT -
                constants.HEIGHT_GROUND -
                (pipeGapBottomYSecond + constants.PIPE_GAP)
        );

        //draw thirdd Pipes
        context.drawImage(
            constants.PIPEROTATE,
            pipeXThird,
            0,
            constants.PIPE_WIDTH,
            pipeGapBottomYThird
        );

        context.drawImage(
            constants.PIPE,
            pipeXThird,
            pipeGapBottomYThird + constants.PIPE_GAP,
            constants.PIPE_WIDTH,
            constants.CANVAS_HEIGHT -
                constants.HEIGHT_GROUND -
                (pipeGapBottomYThird + constants.PIPE_GAP)
        );
    };

    useEffect(() => {
        try {
            const isSoundEnabled = JSON.parse(
                localStorage.getItem("soundIsEnabled") || String(false)
            );

            if (isSoundEnabled && audioContext.state === "suspended") {
                audioContext.resume();
            }

            if (!isSoundEnabled && audioContext.state === "running") {
                audioContext.suspend();
            }
        } catch (e) {
            // TODO: add notification
            audioContext.suspend();
            localStorage.setItem("soundIsEnabled", JSON.stringify(false));
        }
    }, []);

    useEffect(() => {
        if (canvas.current) {
            const context = canvas.current.getContext("2d");

            if (context) {
                const interval = setInterval(() => {
                    // dying
                    if (touchedPipe() || fallOut()) {
                        if (user) {
                            addScore(user, score.toString());
                        }

                        if (score > bestScore) {
                            bestScore = score;
                            localStorage.setItem("bestScore", score.toString());
                        }

                        if (touchedPipe()) {
                            soundElements.hit.play();
                        }

                        soundElements.die.play();

                        setIsShowModal(true);
                        clearInterval(interval);
                        reset();
                    }

                    if (canGetScore && birdX > pipeX + constants.PIPE_WIDTH) {
                        canGetScore = false;
                        score++;
                    }

                    if (
                        canGetScore &&
                        birdX > pipeXSecond + constants.PIPE_WIDTH
                    ) {
                        canGetScore = false;
                        score++;
                    }
                    if (
                        canGetScore &&
                        birdX > pipeXThird + constants.PIPE_WIDTH
                    ) {
                        canGetScore = false;
                        score++;
                    }

                    draw(context);

                    if (!hasStarted) {
                        return;
                    }

                    if (pipeX < -constants.PIPE_WIDTH) {
                        pipeX = constants.CANVAS_WIDTH;
                        pipeGapBottomY = constants.PIPE_GAP * Math.random();
                        canGetScore = true;
                    }

                    if (pipeXSecond < -constants.PIPE_WIDTH) {
                        pipeXSecond = constants.CANVAS_WIDTH;
                        pipeGapBottomYSecond =
                            constants.PIPE_GAP * Math.random();
                        canGetScore = true;
                    }
                    if (pipeXThird < -constants.PIPE_WIDTH) {
                        pipeXThird = constants.CANVAS_WIDTH;
                        pipeGapBottomYThird =
                            constants.PIPE_GAP * Math.random();
                        canGetScore = true;
                    }

                    if (groundX <= -constants.CANVAS_WIDTH) {
                        groundX = 0;
                    }

                    context.fillStyle = "black";
                    context.font = "26px Roboto";
                    context.fillText(
                        score.toString(),
                        constants.CANVAS_WIDTH / 2 - 15,
                        50
                    );

                    pipeX -= constants.SPEED;
                    pipeXSecond -= constants.SPEED;
                    pipeXThird -= constants.SPEED;
                    groundX -= constants.SPEED;
                    birdY += birdYSpeed * (constants.INTERVAL / 1000);
                    birdYSpeed -=
                        constants.FALL_SPEED * (constants.INTERVAL / 1000);
                }, constants.INTERVAL);
            }
        }
    }, []);

    return (
        <>
            <div
                onClick={jump}
                onKeyPress={jump}
                style={{ position: "relative" }}
                data-testid="game">
                <SoundPanel audioContext={audioContext} />
                {isReady ? (
                    <p
                        style={{
                            position: "absolute",
                            top: "55%",
                            left: "25%",
                            fontSize: "40px",
                        }}>
                        Нажмите на пробел для старта игры
                    </p>
                ) : null}
                <canvas
                    ref={canvas}
                    width={constants.CANVAS_WIDTH}
                    height={constants.CANVAS_HEIGHT}
                />
            </div>
            <Modal
                visible={isShowModal}
                onOk={() => window.location.reload()}
                cancelButtonProps={{ style: { display: "none" } }}
                closable={false}
                style={{ top: "40vh" }}>
                <>
                    <div>Ваш результат: {score}</div>
                    <div>Лучший результат: {bestScore}</div>
                </>
            </Modal>
        </>
    );
};

export default Game;
