import { profileInfoRequest, profilePasswordRequest } from "@/api/ProfileApi";
import { ProfilePasswordFormValuesType } from "@/components/forms/ProfileForm/ProfilePasswordForm/ProfilePasswordForm";
import { ProfileFormValuesType } from "@/components/forms/ProfileForm/ProfileInfoForm/ProfileInfoForm";

export const updateInfo = async (values: ProfileFormValuesType) => {
    try {
        const response = await profileInfoRequest(values);

        return response;
    } catch (error) {
        return null;
    }
};

export const updatePassword = async (values: ProfilePasswordFormValuesType) => {
    try {
        const response = await profilePasswordRequest(values);

        return response;
    } catch (error) {
        return null;
    }
};
