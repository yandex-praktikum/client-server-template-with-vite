import { addLeaderboardScore, getLeaderboard } from "@/api/LeaderboardApi";
import { UserFromServer } from "@/api/typesApi";

export const getLeaders = async () => {
    try {
        const response = await getLeaderboard();

        return response;
    } catch (error) {
        return null;
    }
};

export const addScore = async (user: UserFromServer, score: string) => {
    try {
        const response = await addLeaderboardScore(user, score);

        return response;
    } catch (error) {
        return null;
    }
};
