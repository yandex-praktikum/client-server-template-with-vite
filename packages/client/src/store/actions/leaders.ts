import { getLeaders, setLeader } from '@src/api/leaderboardAPI';
import { setLeaders } from '@src/store/reducers';
import { LeaderData, LeadersReq, LeaderDataDTO } from '@src/types/leaders';
import { transformLeader } from '@src/utils/apiTransformers';

import { TAuthAction } from './auth';

export const getLeadersList = (): TAuthAction =>
    async dispatch => {
        const params: LeadersReq = {
            ratingFieldName: 'score',
            cursor: 0,
            limit: 100,
        };

        try {
            const leadersDto = await getLeaders(params);
            const leaders = leadersDto.map((leader): LeaderData => {
                return transformLeader(leader.data);
            });
            dispatch(setLeaders(leaders));
        }
        catch (err) {
            throw new Error('Leaders list not found ');
        }
    };

export const setLeaderOntoBoard = (
    id: number,
    userName: string,
    score: number
): TAuthAction =>
    async dispatch => {
        const dto: LeaderDataDTO = {
            id: id,
            login: userName,
            score: score,
        };

        try {
            await setLeader(dto);
        } catch (err) {
            throw new Error('Error occure while saving data');
        } finally {
            dispatch(getLeadersList());
        }
    };
