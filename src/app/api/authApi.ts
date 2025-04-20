import { baseApi } from "./baseApi.ts";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<
            { message: string },
            { firstname: string, lastname: string, email: string, password: string; }
        >({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        login: builder.mutation<{ token: string, id: string; }, { email: string, password: string; }>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const { useLoginMutation, useSignupMutation } = authApi;