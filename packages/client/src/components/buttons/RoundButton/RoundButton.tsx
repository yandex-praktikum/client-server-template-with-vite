import { MouseEventHandler } from "react";
import "./RoundButton.scss";

export type RoundButtonProps = {
    title?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    buttonStyle?: Record<string, string>;
    className?: string;
};

export const RoundButton = ({
    onClick,
    buttonStyle,
    title,
    className = "round-btn",
}: RoundButtonProps) => {
    const defaultOnClick: MouseEventHandler<HTMLButtonElement> = event => {
        console.log(event.target);
    };

    return (
        <button
            className={className}
            style={buttonStyle}
            onClick={onClick ? e => onClick(e) : e => defaultOnClick(e)}>
            {title}
        </button>
    );
};
