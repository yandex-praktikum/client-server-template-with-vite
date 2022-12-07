import axios, { AxiosRequestConfig } from "axios";
import { PATH } from "../constants/apiPaths";

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    config.withCredentials = true;
    config.baseURL = PATH.BASE;
    config.timeout = 5000;

    return config;
});

axios.interceptors.response.use(
    function (response) {
        // Any function to work with success query, for example, success notification
        return response;
    },

    // TODO: add error message to the global store? add notification?
    function (error) {
        if (error.response.data.statusCode === 400) {
            window.location.replace("/");
        }

        if (error.response.data.statusCode === 401) {
            window.location.replace("/sign-in");
        }

        if (error.response.data.statusCode === 404) {
            window.location.replace("/error404");
        }
    }
);

const configuredAxios = axios;

export default configuredAxios;
