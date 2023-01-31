import { LeaderDataDTO, LeaderData } from '@src/types/leaders';

export const transformLeader = (data: LeaderDataDTO): LeaderData => {
    return {
        id: data.id,
        user: data.login,
        score: data.score,
    };
};
