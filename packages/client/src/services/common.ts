import { api } from './api';

type CommonResponse  = unknown
//TODO: когда будут готовые  ручки прописать корректные данные и поправить тип ответа.
export const counterApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSomeData: build.query<CommonResponse, void>({
      query: () => 'todos/1',
      providesTags: [],
    }),
    putSomeData: build.mutation<CommonResponse, number>({
      query(body) {
        return {
          url: 'todos',
          method: 'PUT',
          body: { body },
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const { useGetSomeDataQuery, usePutSomeDataMutation } = counterApi;
