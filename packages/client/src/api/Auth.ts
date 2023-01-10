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
    return await axios.post(`auth/signin`, {
        ...data,
    });
};

export const getClientIdRequest = async (): Promise<
    YandexServiceIdResponse | AxiosError
> => {
    return await axios.get(
        `oauth/yandex/service-id?redirect_uri=http%3A%2F%2Flocalhost%3A3000`,
        {}
    );
};

export const getUserDataRequest = async (): Promise<
    UserFromServer | AxiosError
> => {
    const response = await axios.get(`auth/user`);

    if (response.status !== 200) {
        apiErrorHandler(response.status);
    }
    return response.data;
};

export const signoutRequest = async (): Promise<Response | AxiosError> =>
    await axios.post(`auth/logout`);

export const signupRequest = async (
    data: signupRequestData
): Promise<signupResponseData | AxiosError> => {
    return await axios.post(`auth/signup`, {
        ...data,
    });
};
