import axios from "./axiosSetup";
import {
    APIError,
    LoginRequestData,
    ResponseStatus,
    UserFromServer,
} from "./typesApi";

export const signinRequest = async (
    data: LoginRequestData
): Promise<ResponseStatus | APIError> => {
    return await axios.post(`auth/signin`, {
        ...data,
    });
};

export const getUserDataRequest = async (): Promise<
    UserFromServer | APIError
> => {
    return await axios.get(`auth/user`);
};
