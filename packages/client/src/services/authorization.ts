import {
    getUserDataRequest,
    signinRequest,
    signoutRequest,
    signupRequest,
} from "@/api/Auth";
import { signupRequestData } from "@/api/typesApi";
import { LoginFormValuesType } from "@/components/forms/LoginForm/LoginForm";
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

// TODO: Добавить типизацию ответов
export const getUserInfo = async () => {
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
        return response;
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
