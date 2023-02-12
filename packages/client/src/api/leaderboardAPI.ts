import { LeadersReq, NewLeader, LeaderDataDTO } from '@src/types/leaders';
import { BASE_API, TEAM_NAME } from '@src/utils/constants';
import axios, { type AxiosPromise } from 'axios';

export const getLeaders = (dataR: LeadersReq): Promise<Array<{ data: LeaderDataDTO }>> =>
    axios.post(`${BASE_API}/leaderboard/${TEAM_NAME}`, dataR, { withCredentials: true })
        .then(({ data }): Array<{ data: LeaderDataDTO }> => data);

export const setLeader = (dto: LeaderDataDTO): AxiosPromise => {
    const requestParams: NewLeader = {
        ratingFieldName: 'score',
        teamName: TEAM_NAME,
    };

    return axios.post(`${BASE_API}/leaderboard`, { data: dto, ...requestParams }, { withCredentials: true });
};
