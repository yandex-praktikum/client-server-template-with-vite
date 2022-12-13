import { getUserDataRequest, signinRequest, signupRequest } from "../api/Auth";
import { Nullable, signupRequestData, UserFromServer } from "../api/typesApi";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";
import { NavigateFunction } from "react-router-dom";

export const signin = async (values: LoginFormValuesType) => {
    try {
        await signinRequest(values);

        return true;
    } catch (error) {
        return false;
    }
};

export const getUserInfo = async (): Promise<Nullable<UserFromServer>> => {
    try {
        const response = await getUserDataRequest();

        return response as UserFromServer;
    } catch (error) {
        return null;
    }
};

export const signup = async (data: signupRequestData, navigate: NavigateFunction) => {
  try {
    const response = await signupRequest(data)
    if (response.status === 200) {
      navigate("/")
    }
  } catch (error) {
    console.log(error);
  }
}
