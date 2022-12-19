import React, { useEffect, useRef, useState } from "react";
import useEventListener from "@use-it/event-listener";
import * as constants from "./helpers";
import { Modal } from "antd";
import { createSounds } from "../SoundPanel/createSounds";
import { SoundPanel } from "../SoundPanel/SoundPanel";

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
let pipeX = constants.CANVAS_WIDTH;

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

    return (
        checkCollision(birdHitbox, upperPipe) ||
        checkCollision(birdHitbox, lowerPipe)
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
    const [showModal, setShowModal] = useState<boolean>(false);
    const canvas = useRef<HTMLCanvasElement>(null);

    // bird jump
    const jump = () => {
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

        // draw ground
        context.fillStyle = "black";
        context.fillRect(
            groundX,
            constants.GROUND_Y,
            constants.GROUND_WIDTH,
            constants.GROUND_HEIGHT
        );

        context.fillRect(
            groundX + constants.CANVAS_WIDTH,
            constants.GROUND_Y,
            constants.GROUND_WIDTH,
            constants.GROUND_HEIGHT
        );

        // draw bird
        context.fillStyle = "yellow";
        context.fillRect(
            birdX,
            birdY,
            constants.BIRD_WIDTH,
            constants.BIRD_HEIGHT
        );

        // draw pipes
        context.fillStyle = "#a6a6a6";
        context.fillRect(pipeX, 0, constants.PIPE_WIDTH, pipeGapBottomY);
        context.fillRect(
            pipeX,
            pipeGapBottomY + constants.PIPE_GAP,
            constants.PIPE_WIDTH,
            constants.CANVAS_HEIGHT -
                constants.HEIGHT_GROUND -
                (pipeGapBottomY + constants.PIPE_GAP)
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
                        if (score > bestScore) {
                            bestScore = score;
                            localStorage.setItem("bestScore", score.toString());
                        }

                        if (touchedPipe()) {
                            soundElements.hit.play();
                        }

                        soundElements.die.play();

                        setShowModal(true);
                        info();
                        clearInterval(interval);
                        reset();
                    }

                    if (canGetScore && birdX > pipeX + constants.PIPE_WIDTH) {
                        canGetScore = false;
                        score++;
                    }

                    draw(context);

                    if (!hasStarted) {
                        return;
                    }

                    if (pipeX < -constants.PIPE_WIDTH) {
                        pipeX = constants.CANVAS_WIDTH / 2;
                        pipeGapBottomY = constants.PIPE_GAP * Math.random();
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
                    groundX -= constants.SPEED;
                    birdY += birdYSpeed * (constants.INTERVAL / 1000);
                    birdYSpeed -=
                        constants.FALL_SPEED * (constants.INTERVAL / 1000);
                }, constants.INTERVAL);
            }
        }
    }, []);

    const info = () => {
        Modal.info({
            title: "Игра закончена, Вы проиграли:(",
            okText: "Перезапустить игру",
            content: (
                <>
                    <div>Ваш результат: {score}</div>
                    <div>Лучший результат: {bestScore}</div>
                </>
            ),
            onOk: () => window.location.reload(),
        });
    };

    return (
        <>
            <SoundPanel audioContext={audioContext} />
            <div onClick={jump} onKeyPress={jump} data-testid="game">
                <canvas
                    ref={canvas}
                    width={constants.CANVAS_WIDTH}
                    height={constants.CANVAS_HEIGHT}
                />
            </div>
        </>
    );
};

export default Game;
