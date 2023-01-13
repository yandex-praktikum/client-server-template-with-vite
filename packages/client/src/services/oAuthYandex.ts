import { getClientIdRequest } from "@/api/Auth";
import { YandexServiceIdResponse } from "@/api/typesApi";
import axios from "axios";
import { getUserInfo } from "./authorization";
import { NavigateFunction } from "react-router-dom";
import { apiErrorHandler } from "@/api/apiErrorHandler";

export const signinWithYandex = async () => {
    try {
        const response = await getClientIdRequest();

        if (response.status === 200) {
            const { service_id } = (response as YandexServiceIdResponse).data;

            window.location.replace(
                `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000`
            );
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const getYandexToken = async (
    code: string,
    navigate: NavigateFunction
) => {
    try {
        const response = await axios.post(`oauth/yandex`, {
            code: code,
            redirect_uri: "http://localhost:3000",
        });

        if (response.status !== 200) {
            apiErrorHandler(response.status);

            return;
        }

        const userFormServer = await getUserInfo();

        if (userFormServer) {
            localStorage.setItem("user", JSON.stringify(userFormServer));
        }

        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
