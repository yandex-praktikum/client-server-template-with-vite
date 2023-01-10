import { notification } from "antd";
import * as React from "react";

interface Notification {
    status?: number;
}

export const useNotification = (): [
    ({ status }: Notification) => void,
    React.ReactElement<any, string | React.JSXElementConstructor<any>>
] => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({ status = 400 }: Notification) => {
        const message = status === 200 ? "Успешно" : "Произошла ошибка";
        const type = status === 200 ? "success" : "error";

        api[type]({
            message,
            placement: "topRight",
        } as any);
    };

    return [openNotification, contextHolder];
};
