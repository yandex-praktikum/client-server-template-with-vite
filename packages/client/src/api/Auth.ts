import { ENDPOINTS, OAUTH_PATH } from "@/constants/apiPaths";
import { AxiosError } from "axios";
import { apiErrorHandler } from "./apiErrorHandler";
import axios from "./axiosSetup";
import {
    LoginRequestData,
    UserFromServer,
    signupRequestData,
    signupResponseData,
    YandexServiceIdResponse,
} from "./typesApi";

export const signinRequest = async (
    data: LoginRequestData
): Promise<Response | AxiosError> => {
    return await axios.post(ENDPOINTS.AUTH.SIGNIN, {
        ...data,
    });
};

export const getClientIdRequest = async (): Promise<
    YandexServiceIdResponse | AxiosError
> => {
    return await axios.get(OAUTH_PATH.SERVICE_ID, {
        params: {
            redirect_uri: OAUTH_PATH.REDIRECT_URL,
        },
    });
};

export const getUserDataRequest = async (): Promise<
    UserFromServer | AxiosError
> => {
    const response = await axios.get(ENDPOINTS.AUTH.PROFILE);

    if (response.status !== 200) {
        apiErrorHandler(response.status);
    }
    return response.data;
};

export const signoutRequest = async (): Promise<Response | AxiosError> =>
    await axios.post(ENDPOINTS.AUTH.SIGNOUT);

export const signupRequest = async (
    data: signupRequestData
): Promise<signupResponseData | AxiosError> => {
    return await axios.post(ENDPOINTS.AUTH.SIGNUP, {
        ...data,
    });
};
