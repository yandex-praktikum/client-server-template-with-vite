import { api, commonFetchArgs } from './api';

export const ALL_LEADERBOARD_DATA = {
  ratingFieldName: 'points',
  cursor: 0,
  limit: 10,
};

export const leaderboardApi = api.injectEndpoints({
  endpoints: build => ({
    addUser: build.mutation({
      query: data => ({
        url: 'leaderboard',
        method: 'POST',
        body: { teamName: 'ChicagoTeam', ratingFieldName: 'points', data },
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getLeaderboard'],
    }),
    getAll: build.query({
      query: () => ({
        url: 'leaderboard/all',
        method: 'POST',
        body: ALL_LEADERBOARD_DATA,
        ...commonFetchArgs,
      }),
      providesTags: ['getLeaderboard'],
    }),
  }),
});

export const { useAddUserMutation, useGetAllQuery } = leaderboardApi;
