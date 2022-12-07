import { SOUND_ICON } from "../../../constants/imagesPaths";
import { RoundButton } from "../RoundButton/RoundButton";

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
  left: "40px",
  zIndex: "10",
};

const soundClickHandler = () => {
  console.log("mute!");
};

export const SoundButton = () => {
  return (
    <RoundButton buttonStyle={soundButtonStyle} onClick={soundClickHandler} />
  );
};
