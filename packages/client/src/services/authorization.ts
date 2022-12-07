import { getUserDataRequest, signinRequest } from "../api/Auth";
import { Nullable, UserFromServer } from "../api/typesApi";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";

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
