import "./RoundButton.scss";

export type RoundButtonProps = {
    title?: string;
    onClick?: () => void;
    buttonStyle?: Record<string, string>;
};

export const RoundButton = ({
    onClick,
    buttonStyle,
    title,
}: RoundButtonProps) => {
    return (
        <button className="round-btn" style={buttonStyle} onClick={onClick}>
            {title}
        </button>
    );
};
