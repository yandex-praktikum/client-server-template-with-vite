import { getUserDataRequest, signinRequest } from "../api/Auth";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";

export const signin = async (values: LoginFormValuesType) => {
    try {
        await signinRequest(values);

        return true;
    } catch (error) {
        return false;
    }
};

// TODO: Добавить типизацию ответов
export const getUserInfo = async (): Promise<any> => {
    try {
        const response = await getUserDataRequest();

        return response;
    } catch (error) {
        return null;
    }
};
