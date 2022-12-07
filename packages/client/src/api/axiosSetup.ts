import axios, { AxiosRequestConfig } from "axios";
import { PATH } from "../constants/apiPaths";
import { apiErrorHandler } from "./apiErrorHandler";

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    config.withCredentials = true;
    config.baseURL = PATH.BASE;
    config.timeout = 5000;

    return config;
});

axios.interceptors.response.use(
    function (response) {
        // TODO: add notification
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
