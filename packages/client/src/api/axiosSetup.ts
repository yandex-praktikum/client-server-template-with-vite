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
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    function (error) {
        if (error.response.data.statusCode === 400) {
            window.location.replace("/");
        }
    }
);

const configuredAxios = axios;

export default configuredAxios;
