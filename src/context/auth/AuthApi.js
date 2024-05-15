// src/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:8080/api/v1',
    baseUrl: "https://binaries.uz/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"], // Invalidate auth data after login
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/sign-out",
        method: "POST",
        body: { mobileToken: "124" },
      }),
      invalidatesTags: ["Auth"], // Invalidate auth data after logout
    }),
    checkAuth: builder.query({
      query: () => "users/currentUser",
      providesTags: ["Auth"], // This endpoint provides Auth data
    }),
  }),
});

const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } = authApi;

export { useLoginMutation, useLogoutMutation, useCheckAuthQuery, authApi };
