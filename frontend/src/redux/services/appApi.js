import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

import { logout, setUser } from '../features/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().userState.access_token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      toast.error('Session expired, please login.');
      api.dispatch(logout());
    }
    return result;
  },
  tagTypes: ['User', 'Operation', 'Record', 'Balance'],
  endpoints: (builder) => ({
    fetchMe: builder.query({
      query() {
        return {
          url: '/users/me',
        };
      },
      transformResponse: (result) => result.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (error) {}
      },
      providesTags: ['User'],
    }),
    fetchBalance: builder.query({
      query() {
        return {
          url: '/users/balance',
        };
      },
      providesTags: ['Balance'],
    }),
    updateUser: builder.mutation({
      query(data) {
        return {
          url: '/users',
          method: 'PATCH',
          body: data.body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      invalidatesTags: ['User'],
    }),
    fetchOperations: builder.query({
      query(arg = { params: {} }) {
        return {
          url: `/operations`,
          params: arg.params,
        };
      },
      providesTags: ['Operation'],
    }),
    fetchUserRecords: builder.query({
      query(arg = { params: {} }) {
        return {
          url: `/records`,
          params: arg.params,
        };
      },
      providesTags: ['Record'],
    }),
    performOperation: builder.mutation({
      query(data) {
        return {
          url: `/records`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Record', 'Balance', 'User'],
    }),
    deleteRecord: builder.mutation({
      query(id) {
        return {
          url: `/records/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Record'],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useFetchMeQuery,
  useFetchBalanceQuery,
  useFetchUserRecordsQuery,
  useFetchOperationsQuery,
  usePerformOperationMutation,
  useDeleteRecordMutation,
} = appApi;
