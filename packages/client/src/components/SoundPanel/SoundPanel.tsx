import { Switch } from "antd";
import Slider, { SliderMarks } from "antd/es/slider";
import { Nullable } from "../../api/typesApi";
import "./SoundPanel.scss";
import soundfile from "../../assets/presentation.mp3";
import SoundOnIcon from "../customIcons/SoundOnIcon";
import SoundOffIcon from "../customIcons/SoundOffIcon";
import { DEFAULT_VOLUME_LEVEL } from "../../constants/defaultSoundSettings";
import { useState } from "react";

export const SoundPanel = () => {
    // let isSoundEnabled: boolean;

    // try {
    //     isSoundEnabled = JSON.parse(
    //         localStorage.getItem("soundIsEnabled") || ""
    //     );
    // } catch (error) {
    //     isSoundEnabled = false;
    // }

    // const [isSoundEnabled, setIsSoundEnabled] = useState(soundState || false);

    const marks: SliderMarks = {
        0: "0",
        1: "100",
    };

    // // let volumeLevel = DEFAULT_VOLUME_LEVEL;

    const audioElement = new Audio(soundfile);
    audioElement.loop = true;

    const AudioContext = window.AudioContext;
    const context = new AudioContext();
    const mediaSourceNode = context.createMediaElementSource(audioElement);
    const gainNode = context.createGain();

    // const changeVolumeHandler = (newValue: number) => {
    //     gainNode.gain.value = newValue;
    //     // setInputValue(newValue);
    //     // volumeLevel = newValue;
    //     localStorage.setItem("soundIsEnabled", JSON.stringify(isSoundEnabled));
    //     localStorage.setItem("volumeLevel", JSON.stringify(newValue));
    // };

    mediaSourceNode.connect(gainNode).connect(context.destination);

    const togglePlay = (checked: boolean) => {
        localStorage.setItem("soundIsEnabled", JSON.stringify(checked));

        if (context.state === "suspended") {
            context.resume();
        }

        if (!checked) {
            audioElement.pause();
        } else {
            gainNode.gain.value = DEFAULT_VOLUME_LEVEL;
            // volumeLevel.value = gainNode.gain.value;
            audioElement.play();
            audioElement.currentTime = 0;
        }

        const roundButton: Nullable<HTMLButtonElement> =
            document.querySelector(".round-btn");

        if (roundButton) {
            if (checked) {
                roundButton.textContent = "ON";
                roundButton.classList.remove("sound-btn-off");
                roundButton.classList.add("sound-btn-on");

                return;
            }

            roundButton.textContent = "OFF";
            roundButton.classList.remove("sound-btn-on");
            roundButton.classList.add("sound-btn-off");
        }
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
            />
        </>
    );
};
