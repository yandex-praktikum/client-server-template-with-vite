import { profileInfoRequest, profilePasswordRequest } from "../api/ProfileApi";
import { ProfilePasswordFormValuesType } from "../components/forms/ProfileForm/ProfilePasswordForm/ProfilePasswordForm";
import { ProfileFormValuesType } from "../components/forms/ProfileForm/ProfileInfoForm/ProfileInfoForm";

export const updateInfo = async (values: ProfileFormValuesType) => {
    try {
        const response = await profileInfoRequest(values);
        console.log(response);

        return true;
    } catch (error) {
        return false;
    }
};

export const updatePassword = async (values: ProfilePasswordFormValuesType) => {
    try {
        const response = await profilePasswordRequest(values);
        console.log(response);

        return true;
    } catch (error) {
        return false;
    }
};
