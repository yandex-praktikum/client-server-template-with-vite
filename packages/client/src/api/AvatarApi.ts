import axios from "./axiosSetup";
import { PATH } from "../constants/apiPaths";

export const AvatarApi = async (options: any) => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    const config = {
        headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("avatar", file);
    try {
        const res = await axios.put(
            `${PATH.BASE}user/profile/avatar`,
            fmData,
            config
        );

        onSuccess("Ok");
        console.log("server res: ", res);
    } catch (err) {
        console.log("Eroor: ", err);
        onError({ err });
    }
};
