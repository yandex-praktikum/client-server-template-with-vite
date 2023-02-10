import { ForumApiService } from '@src/api/forumAPI';
import { setThreads, setComments } from '@src/store/reducers';
import type { IForumThreadRequest, IForumCommentRequest } from '@src/types/forumPageProps';

import { TAuthAction } from './auth';

import { selectUserInfo, selectPickedThread } from '../selectors';

const handleError = (error: unknown) => {
    if (error instanceof Error) {
        throw new Error(`Error message: ${error.message}`);
    } else {
        throw new Error(`Unexpected request error: ${error}`);
    }
};

export const getThreadList = (): TAuthAction =>
    async dispatch => {
        try {
            const { data } = await ForumApiService.getTreads();
            dispatch(setThreads(data));
        } catch (err) {
            handleError(err);
        }
    };

export const setThread = (data: Omit<IForumThreadRequest, 'user'>): TAuthAction => async (dispatch, getState) => {
    const userInfo = selectUserInfo(getState());

    if (userInfo) {
        const { id, login, avatar } = userInfo ?? {};
        const request = {
            ...data,
            user: {
                id: id,
                name: login,
                avatar_path: avatar,
            },
        };

        try {
            await ForumApiService.createThread(request);
            dispatch(getThreadList());
        } catch (err) {
            handleError(err);
        }
    } else {
        console.error('No Logged-in user');
    }

};

export const getCommentsListForThread = (): TAuthAction => async (dispatch, getState) => {
    const pickedThreadInfo = selectPickedThread(getState());

    if (pickedThreadInfo) {
        const { thread_id } = pickedThreadInfo;

        try {
            const { data } = await ForumApiService.getMessagesByThreadId(thread_id);
            dispatch(setComments(data));
        } catch (err) {
            handleError(err);
        }
    }
};

export const setCommentForThread = (data: Omit<IForumCommentRequest, 'user' | 'thread_id'>): TAuthAction => async (dispatch, getState) => {
    const state = getState();
    const userInfo = selectUserInfo(state);
    const parentThreadInfo = selectPickedThread(state);

    if (userInfo && parentThreadInfo) {
        const { id, login, avatar } = userInfo;
        const { thread_id } = parentThreadInfo;
        const request = {
            ...data,
            user: {
                id: id,
                name: login,
                avatar_path: avatar,
            },
            thread_id: thread_id,
        };

        try {
            await ForumApiService.createMessage(request);
            dispatch(getCommentsListForThread());
        } catch (err) {
            handleError(err);
        }
    } else {
        console.error('No Logged-in user or thread not selected');
    }

};
