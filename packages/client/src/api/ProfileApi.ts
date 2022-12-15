import { ResponseStatus } from "./typesApi";
import { PATH } from "../constants/apiPaths";
import { ProfileFormValuesType } from "../components/forms/ProfileForm/ProfileInfoForm/ProfileInfoForm";
import { ProfilePasswordFormValuesType } from "../components/forms/ProfileForm/ProfilePasswordForm/ProfilePasswordForm";
import axios from "./axiosSetup";
import { AxiosError } from "axios";

export const profileInfoRequest = async (
    data: ProfileFormValuesType
): Promise<ResponseStatus | AxiosError> =>
    await axios.put(`${PATH.BASE}user/profile`, data);

export const profilePasswordRequest = async (
    data: ProfilePasswordFormValuesType
): Promise<ResponseStatus | AxiosError> =>
    await axios.put(`${PATH.BASE}user/password`, data);
