import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { FC, useState, useRef, useEffect } from 'react';

const AudioButton: FC = () => {
    const [isMusicOn, setIsMusicOn] = useState(true);
    const [audioContextState, setAudioContext] = useState<AudioContext | null>(null);
    const [audioElementState, setAudioElement] = useState<HTMLAudioElement | null>(null);
    const audioElement = useRef(null);

    const handleMusic = () => {
        audioContextState?.resume();

        if (isMusicOn) {
            setIsMusicOn(false);
            audioElementState?.play();
        } else {
            setIsMusicOn(true);
            audioElementState?.pause();
        }
    };

    useEffect(() => {
        const AudioContext = new window.AudioContext();
        setAudioContext(AudioContext);
        setAudioElement(audioElement.current);
    }, [audioElement]);

    return (
        <>
            <audio ref={audioElement} src='../../src/audio/main-sound.mp3' />
            {isMusicOn ? <VolumeOff color='primary' onClick={handleMusic} /> : <VolumeUp color='primary' onClick={handleMusic} />}
        </>
    );
};

export default AudioButton;
