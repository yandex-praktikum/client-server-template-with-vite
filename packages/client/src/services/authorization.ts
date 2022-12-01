import { signinRequest } from "../api/Auth";
import { LoginFormValuesType } from "../components/forms/LoginForm/LoginForm";

export const signin = async (values: LoginFormValuesType) => {
  // showPreloader();

  try {
    const response = await signinRequest(values);
    console.log(response);

    window.history.pushState({}, "", "/main");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    // hidePreloader();
  }
};
