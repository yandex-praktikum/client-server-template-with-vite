import { LeaderDataDTO, LeaderData } from '@src/types/leaders';

export const transformLeader = ({ id, login, score }: LeaderDataDTO): LeaderData => ({ id, score, user: login });
