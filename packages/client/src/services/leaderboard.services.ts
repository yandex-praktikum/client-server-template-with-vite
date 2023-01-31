import { getLeaders, setLeader } from '@src/api/leaderboardAPI';
import { LeaderDataDTO, LeaderData, LeadersReq } from '@src/types/leaders';
import { transformLeader } from '@src/utils/apiTransformers';

export const getLeadersList = async (
    params: LeadersReq
): Promise<LeaderData[]> => {
    try {
        const leadersDto = await getLeaders(params);

        return leadersDto.data.map((leader) => {
            return transformLeader(leader.data);
        });
    }
    catch (err) {
        throw new Error('Leaders list not found ');
    }
};

export const setLeaderOntoBoard = async (
    id: number,
    userName: string,
    score: number
): Promise<void> => {
    const dto: LeaderDataDTO = {
        id: id,
        login: userName,
        score: score,
    };

    try {
        await setLeader(dto);
    } catch (err) {
        throw new Error('Error occure while saving data');
    }
};
