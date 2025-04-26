import { baseApi } from "./baseApi.ts";
import { LoginDto, SignupDto, CredentialsDto } from "../dto/Auth.dto.ts";
import { MessageDto } from "../dto/Message.dto.ts";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<MessageDto, SignupDto>({
            query: (user) => ({
                url: "/signup",
                method: "POST",
                body: user
            })
        }),
        login: builder.mutation<CredentialsDto, LoginDto>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
    })
})

export const { useLoginMutation, useSignupMutation } = authApi;
