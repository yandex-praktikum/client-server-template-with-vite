import { getUserDataRequest, signinRequest, signupRequest } from "../api/Auth";
import { signupRequestData } from "../api/typesApi";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";
import { NavigateFunction } from "react-router-dom";

export const signin = async (values: LoginFormValuesType) => {
    try {
        await signinRequest(values);

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
        return response;
    } catch (error) {
        console.log(error);
    }
};
