import { createApi, type FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { YANDEX_API_URL } from '../../../../../shared/consts/common';

const baseQuery = fetchBaseQuery({
  baseUrl: YANDEX_API_URL,
  credentials: 'include',
  cache: 'no-cache',
});

export const api = createApi({
  reducerPath: 'API',
  baseQuery: baseQuery,
  tagTypes: ['getUser', 'getLeaderboard'],
  endpoints: () => ({}),
});

export const commonFetchArgs: Pick<FetchArgs, 'responseHandler'> = {
  responseHandler: 'content-type',
};
