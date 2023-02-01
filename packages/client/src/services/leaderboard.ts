import { addLeaderboardScore } from "@/api/LeaderboardApi";
import { UserFromServer } from "@/api/typesApi";

export const addScore = async (user: UserFromServer, score: string) => {
    try {
        return await addLeaderboardScore(user, score);
    } catch (error) {
        return null;
    }
};
