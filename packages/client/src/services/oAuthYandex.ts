import { getClientIdRequest } from "@/api/Auth";
import { UserFromServer, YandexServiceIdResponse } from "@/api/typesApi";
import axios from "axios";
import { getUserInfo } from "./authorization";
import { NavigateFunction } from "react-router-dom";
import { apiErrorHandler } from "@/api/apiErrorHandler";
import { userActions } from "@/store/slices/user/userSlice";
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { OAUTH_PATH } from "@/constants/apiPaths";

export const signinWithYandex = async () => {
    try {
        const response = await getClientIdRequest();

        if (response.status === 200) {
            const { service_id } = (response as YandexServiceIdResponse).data;

            const redirectUrl = new URL(OAUTH_PATH.YANDEX_AUTHORIZE);
            redirectUrl.searchParams.set("client_id", service_id);
            redirectUrl.searchParams.set(
                "redirect_uri",
                OAUTH_PATH.REDIRECT_URL
            );

            window.location.replace(redirectUrl);
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const getYandexToken = async (
    code: string,
    navigate: NavigateFunction,
    dispatch: ThunkDispatch<
        {
            user: {
                user: Nullable<UserFromServer>;
            };
        },
        undefined,
        AnyAction
    > &
        Dispatch<AnyAction>
) => {
    try {
        const response = await axios.post(OAUTH_PATH.BASE, {
            code: code,
            redirect_uri: OAUTH_PATH.REDIRECT_URL,
        });

        if (response.status > 400) {
            apiErrorHandler(response.status);

            return;
        }

        const userFormServer = await getUserInfo();

        if (userFormServer) {
            localStorage.setItem("user", JSON.stringify(userFormServer));
            dispatch(userActions.setUser(userFormServer));
        }

        window.history.pushState({}, "", OAUTH_PATH.REDIRECT_URL);
    } catch (error) {
        console.log(error);
    }
};
