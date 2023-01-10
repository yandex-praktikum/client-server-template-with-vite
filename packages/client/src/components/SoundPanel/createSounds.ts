import * as soundfFiles from "@/assets/sounds";
import { mapSrcToName } from "./soundHelpers";

export const createSounds = () => {
    const soundElements: Record<string, HTMLAudioElement> = Object.values(
        soundfFiles
    ).reduce((acc, soundFile) => {
        const audioElement = new Audio(soundFile);
        const name = audioElement.src.split("/").pop();

        if (name === "presentation.mp3") {
            audioElement.loop = true;
        }

        return name ? { ...acc, [mapSrcToName[name]]: audioElement } : acc;
    }, {});

    const AudioContext = window.AudioContext;
    const context = new AudioContext();
    const gainNode = context.createGain();

    Object.values(soundElements).forEach(element => {
        context
            .createMediaElementSource(element)
            .connect(gainNode)
            .connect(context.destination);
    });

    return { soundElements, audioContext: context, gainNode };
};
