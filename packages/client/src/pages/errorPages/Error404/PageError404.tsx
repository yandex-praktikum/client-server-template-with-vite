import React, { FC } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

type PageError404Type = {
    resetError: () => void;
};

const PageError404: FC<PageError404Type> = ({ resetError }) => {
    const navigate = useNavigate();
    const onClick = () => {
        resetError();
        navigate(-1);
    };

    return (
        <div>
            <div>
                <h1>ERROR!</h1>
                <Button onClick={onClick}>go Back</Button>
            </div>
        </div>
    );
};

export default PageError404;
