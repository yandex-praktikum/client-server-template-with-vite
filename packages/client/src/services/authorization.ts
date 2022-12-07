import { signinRequest } from "../api/Auth";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";

export const signin = async (values: LoginFormValuesType) => {
    // showPreloader();

    try {
        await signinRequest(values);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        // hidePreloader();
    }
};
