import { ResponseStatus, UserFromServer } from "@/api/typesApi";
import { AxiosError } from "axios";
import axios from "./axiosSetup";
import { PATH } from "@/constants/apiPaths";

const TEAM_NAME = "pachkateam";
const RATING_FIELD_NAME = "result";

export const getLeaderboard = async (): Promise<ResponseStatus | AxiosError> =>
    await axios.post(`${PATH.BASE}leaderboard/${TEAM_NAME}`, {
        ratingFieldName: RATING_FIELD_NAME,
        cursor: 0,
        limit: 100,
    });

export const addLeaderboardScore = async (
    user: UserFromServer,
    score: string
): Promise<ResponseStatus | AxiosError> =>
    await axios.post(`${PATH.BASE}leaderboard`, {
        data: {
            [RATING_FIELD_NAME]: {
                score,
                name: user.login,
                date: new Date(),
            },
        },
        ratingFieldName: RATING_FIELD_NAME,
        teamName: TEAM_NAME,
    });
