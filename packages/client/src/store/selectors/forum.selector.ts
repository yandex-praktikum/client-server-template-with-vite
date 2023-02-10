import { RootState } from '../store';

export const selectThreads = (state: RootState) => state.forum.threads;
export const selectComments = (state: RootState) => state.forum.comments;
export const selectPickedThread = (state: RootState) => state.forum.pickedThread;
