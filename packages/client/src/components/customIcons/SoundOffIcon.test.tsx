import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoundOffIcon from "./SoundOffIcon";

describe("SoundOffIcon", () => {
    const renderSoundOffIcon = () => render(<SoundOffIcon />);

    test("render SoundOffIcon", () => {
        renderSoundOffIcon();
        expect(screen.getByTestId("sound-off")).toBeInTheDocument();
    });
});
