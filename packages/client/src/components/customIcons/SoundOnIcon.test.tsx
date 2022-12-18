import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoundOnIcon from "./SoundOnIcon";

describe("SoundOnIcon", () => {
    const renderSoundOnIcon = () => render(<SoundOnIcon />);

    test("render SoundOnIcon", () => {
        renderSoundOnIcon();
        expect(screen.getByTestId("sound-on")).toBeInTheDocument();
    });
});
