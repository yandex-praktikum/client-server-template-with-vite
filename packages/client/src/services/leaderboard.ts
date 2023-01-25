import { addLeaderboardScore, getLeaderboard } from "@/api/LeaderboardApi";
import { UserFromServer } from "@/api/typesApi";

export const getLeaders = async () => {
    try {
        return await getLeaderboard();
    } catch (error) {
        return null;
    }
};

export const addScore = async (user: UserFromServer, score: string) => {
    try {
        return await addLeaderboardScore(user, score);
    } catch (error) {
        return null;
    }
};
