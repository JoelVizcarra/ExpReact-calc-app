import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login } from '../features/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_API}/auth`,
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query(data) {
        return {
          url: '/register',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query(credentials) {
        return {
          url: '/login',
          method: 'POST',
          body: credentials,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authApi;
