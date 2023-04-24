import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login, logout } from '../features/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_API}/auth`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().userState.access_token;
      if (token && endpoint === 'logoutUser')
        headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
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
    logoutUser: builder.mutation({
      query() {
        return {
          url: '/logout',
          method: 'GET',
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(logout());
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
