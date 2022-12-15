import axios from "./axiosSetup";
import { PATH } from "../constants/apiPaths";
import type {
    UploadRequestOption,
    UploadRequestError,
} from "rc-upload/lib/interface";

export const AvatarApi = async (options: UploadRequestOption) => {
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

        onSuccess && onSuccess("Ok");
        console.log("server res: ", res);
    } catch (err) {
        console.log("Error: ", err);
        onError && onError(err as UploadRequestError);
    }
};
