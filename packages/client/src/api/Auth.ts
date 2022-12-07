import axios from "axios";
import { PATH } from "../constants/apiPaths";
import { APIError, LoginRequestData, ResponseStatus } from "./typesApi";

export const signinRequest = async (
    data: LoginRequestData
): Promise<ResponseStatus | APIError> => {
    console.log(data);
    return await axios.post(`${PATH.BASE}auth/signin`, {
        ...data,
    });
};
