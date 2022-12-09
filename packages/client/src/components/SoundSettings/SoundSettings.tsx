import { Popover } from "antd";
import Slider, { SliderMarks } from "antd/es/slider";
import { SOUND_ICON } from "../../constants/imagesPaths";
import { RoundButton } from "../buttons/RoundButton/RoundButton";
import "./SoundSettings.scss";

export const SoundSettings = () => {
    const background = SOUND_ICON;

    const soundButtonStyle = {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "40px",
        left: "100px",
        zIndex: "10",
    };

    const marks: SliderMarks = {
        0: "0",
        100: "100",
    };

    const volumeSettingsContent = (
        <Slider marks={marks} step={1} defaultValue={0} />
    );

    return (
        <Popover
            content={volumeSettingsContent}
            trigger="click"
            className="volume-settings">
            <RoundButton buttonStyle={soundButtonStyle} />
        </Popover>
    );
};
