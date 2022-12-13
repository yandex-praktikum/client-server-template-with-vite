import { AxiosError } from "axios";
import axios from "./axiosSetup";
import { LoginRequestData, ResponseStatus, UserFromServer, signupRequestData, signupResponseData } from "./typesApi";

export const signinRequest = async (
    data: LoginRequestData
): Promise<ResponseStatus | AxiosError> => {
    return await axios.post(`auth/signin`, {
        ...data,
    });
};

export const getUserDataRequest = async (): Promise<
    UserFromServer | AxiosError
> => {
    return await axios.get(`auth/user`);
};

export const signupRequest = async (data: signupRequestData): Promise<signupResponseData | AxiosError> => {
  return await axios.post(`auth/signup`, {
    ...data,
  });
}
