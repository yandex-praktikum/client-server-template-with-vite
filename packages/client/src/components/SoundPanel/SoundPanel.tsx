import { Switch } from "antd";
import Slider, { SliderMarks } from "antd/es/slider";
import { Nullable } from "../../api/typesApi";
import "./SoundPanel.scss";
import SoundOnIcon from "../customIcons/SoundOnIcon";
import SoundOffIcon from "../customIcons/SoundOffIcon";
import { DEFAULT_VOLUME_LEVEL } from "../../constants/defaultSoundSettings";
import { useState } from "react";
import { ChangeEvent } from "react";

export type SoundPanelProps = {
    audioContext: AudioContext;
};

export const SoundPanel = ({ audioContext }: SoundPanelProps) => {
    let isSoundEnabled: boolean;

    try {
        isSoundEnabled = JSON.parse(
            localStorage.getItem("soundIsEnabled") || ""
        );
    } catch (error) {
        isSoundEnabled = false;
    }

    const marks: SliderMarks = {
        0: "0",
        1: "100",
    };

    // // let volumeLevel = DEFAULT_VOLUME_LEVEL;
    // const gainNode = context.createGain();

    // const changeVolumeHandler = (newValue: number) => {
    //     gainNode.gain.value = newValue;
    //     // setInputValue(newValue);
    //     // volumeLevel = newValue;
    //     localStorage.setItem("soundIsEnabled", JSON.stringify(isSoundEnabled));
    //     localStorage.setItem("volumeLevel", JSON.stringify(newValue));
    // };

    // mediaSourceNode.connect(gainNode).connect(context.destination);

    const togglePlay = (checked: boolean) => {
        localStorage.setItem("soundIsEnabled", JSON.stringify(checked));
        (document.activeElement as HTMLInputElement).blur();

        if (audioContext.state === "suspended") {
            audioContext.resume();

            return;
        }

        if (audioContext.state === "running") {
            audioContext.suspend();
        }

        // if (!checked) {
        //     // audioElement.pause();
        // } else {
        //     gainNode.gain.value = DEFAULT_VOLUME_LEVEL;
        //     // volumeLevel.value = gainNode.gain.value;
        //     // audioElement.play();
        //     // audioElement.currentTime = 0;
        // }
    };

    // const volumeSettingsContent = (
    //     <Slider
    //         id="volumeControl"
    //         marks={marks}
    //         min={0.0}
    //         max={1.0}
    //         step={0.01}
    //         defaultValue={0.2}
    //         onAfterChange={changeVolumeHandler}
    //     />
    // );

    return (
        <>
            <Switch
                className="sound-switch"
                checkedChildren={<SoundOnIcon style={{ color: "#fff" }} />}
                unCheckedChildren={<SoundOffIcon style={{ color: "#fff" }} />}
                onChange={togglePlay}
                defaultChecked={isSoundEnabled}
            />
        </>
    );
};
