import type {
    IForumCommentRequest,
    IForumThreadRequest,
    IForumCommentApiModel,
    IForumThreadApiModel,
} from '@src/types/forumPageProps';
import { SERVER_API } from '@src/utils/constants';
import axios, { type AxiosPromise } from 'axios';

const forumApi = axios.create({
    baseURL: SERVER_API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ForumApiService = {
    getTreads(): AxiosPromise<Array<IForumThreadApiModel>> {
        return forumApi.get('/getThreads');
    },
    createThread(data: IForumThreadRequest): AxiosPromise {
        return forumApi.post('/createThread', data);
    },
    getMessagesByThreadId(tiopicId: number): AxiosPromise<Array<IForumCommentApiModel>> {
        return forumApi.get(`/getMessagesByThreadId?id=${tiopicId}`);
    },
    createMessage(data: IForumCommentRequest): AxiosPromise {
        return forumApi.post('/createMessage', data);
    },

};
