import {
    getClientIdRequest,
    getUserDataRequest,
    signinRequest,
    signoutRequest,
    signupRequest,
} from "../api/Auth";
import { signupRequestData, YandexServiceIdResponse } from "../api/typesApi";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";
import { NavigateFunction } from "react-router-dom";
import { MouseEventHandler } from "react";

export const signin = async (values: LoginFormValuesType) => {
    try {
        const response = await signinRequest(values);

        if (response.status === 200 || response.status === 400) {
            return true;
        }
    } catch (error) {
        return false;
    }
};

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

// TODO: Добавить типизацию ответов
export const getUserInfo = async (): Promise<any> => {
    try {
        const response = await getUserDataRequest();

        return response;
    } catch (error) {
        return null;
    }
};

export const signup = async (
    data: signupRequestData,
    navigate: NavigateFunction
) => {
    try {
        const response = await signupRequest(data);

        if (response.status === 200) {
            navigate("/");
        }
    } catch (error) {
        console.log(error);
    }
};

export const signout: MouseEventHandler = async event => {
    console.log(event, "signout");

    try {
        const response = await signoutRequest();

        if (response.status === 200) {
            localStorage.removeItem("user");
            window.location.replace(`/sign-in`);
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
