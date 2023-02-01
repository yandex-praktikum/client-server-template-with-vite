import axios, { AxiosRequestConfig } from "axios";
import { PATH } from "@/constants/apiPaths";
import { apiErrorHandler } from "./apiErrorHandler";
// @ts-ignore
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.withCredentials = true;
    config.baseURL = PATH.BASE;
    config.timeout = 5000;

    return config;
});

axios.interceptors.response.use(
    function (response) {
        // TODO: add notification
        if (response.status !== 200) {
            apiErrorHandler(response.status);
        }

        return response;
    },

    function (error) {
        if (!axios.isAxiosError(error)) {
            console.log(error);
            throw new Error(error.message);
        }

        const responseStatus = error.response?.status;

        if (responseStatus) {
            apiErrorHandler(responseStatus);
        }

        // TODO: add notification

        const message = error.message || error.toString();

        return { status: responseStatus, reason: message };
    }
);

const configuredAxios = axios;

export default configuredAxios;
