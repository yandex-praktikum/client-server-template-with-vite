import React, { FC } from "react";
import { Card, CardProps } from "antd";

import "./ContentContainer.scss";

const ContentContainer: FC<CardProps> = props => {
    return (
        <Card
            className={"content-container"}
            bodyStyle={{ overflowY: "auto", height: "90%" }}
            headStyle={{ fontSize: "28px", color: "white" }}
            {...props}
        />
    );
};

export default ContentContainer;
