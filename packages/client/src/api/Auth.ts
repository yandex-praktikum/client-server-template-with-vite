import { AxiosError } from "axios";
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

export const getUserDataRequest = async (): Promise<UserFromServer> => {
    const res = await axios.get(`auth/user`);

    return res.data as UserFromServer;
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
