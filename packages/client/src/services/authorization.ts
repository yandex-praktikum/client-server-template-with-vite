import { getUserDataRequest, signinRequest } from "../api/Auth";
import { APIError, UserFromServer } from "../api/typesApi";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";
import { PATH } from "../constants/apiPaths";

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

export const getUserInfo = async () => {
    // showPreloader();

    try {
        const response = await getUserDataRequest();
        window.localStorage.setItem(
            `${PATH.BASE}-user`,
            JSON.stringify(response)
        );

        return response;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        // hidePreloader();
    }
};

export const isUserSignedIn = () => {
    const userFromStorage = window.localStorage.getItem(`${PATH.BASE}-user`);
    console.log(userFromStorage);

    if (userFromStorage) {
        try {
            const user = JSON.parse(userFromStorage);
            return true;
            // TODO: add user to the Store?
        } catch (error) {
            // TODO: add error handler
            return false;
        }
    }

    return false;
};
