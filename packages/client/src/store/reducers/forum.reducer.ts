import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IForumThreadApiModel, IForumCommentApiModel } from '@src/types/forumPageProps';

type TThreadData = {
    thread_id: number,
    title: string,
};
export interface IForumState {
    threads: Array<IForumThreadApiModel>,
    comments: Array<IForumCommentApiModel>,
    pickedThread: TThreadData | null,
};
const initialState: IForumState = {
    threads: [],
    comments: [],
    pickedThread: null,
};

export const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        setThreads: (
            state: IForumState,
            { payload }: PayloadAction<Array<IForumThreadApiModel>>
        ) => {
            state.threads = payload;
        },
        setPickedThread: (
            state: IForumState,
            { payload }: PayloadAction<TThreadData>
        ) => {
            state.pickedThread = payload;
        },
        setComments: (
            state: IForumState,
            { payload }: PayloadAction<Array<IForumCommentApiModel>>
        ) => {
            state.comments = payload;
        },
    },
});

export const { setThreads, setComments, setPickedThread } = forumSlice.actions;

export default forumSlice.reducer;
