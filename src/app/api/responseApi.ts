import { baseApi } from "./baseApi.ts";
import { MessageDto } from "../dto/Message.dto.ts";
import { ResponseDto, CreateResponseDto, EditResponseDto } from "../dto/Response.dto.ts";

export const responseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createResponse: builder.mutation<MessageDto, CreateResponseDto>({
            query: (response) => ({
                url: "/response",
                method: "POST",
                body: response
            }),
            invalidatesTags: ["Template"]
        }),
        editResponseById: builder.mutation<MessageDto, EditResponseDto>({
            query: (response) => ({
                url: `/response/${response.responseId}`,
                method: "POST",
                body: response
            }),
            invalidatesTags: ["Template"]
        }),
        getResponsesByTemplateId: builder.query<ResponseDto[], string>({
            query: (templateId) => `/response/template/${templateId}`,
            providesTags: ["Template"]
        }),
        getResponsesByUserId: builder.query<ResponseDto[], string>({
            query: (userId) => `/response/user/${userId}`,
            providesTags: ["Template"]
        }),
        getResponsesByUserAndTemplateId: builder.query<ResponseDto, { userId: string; templateId: string }>({
            query: ({ userId, templateId }) =>
                `/response/user/${userId}/template/${templateId}`,
            providesTags: ["Template"]
        }),
        getResponsesById: builder.query<ResponseDto, string>({
            query: (responseId) => `/response/response/${responseId}`,
            providesTags: ["Template"]
        }),
        deleteResponseById: builder.mutation<MessageDto, string>({
            query: (responseId) => ({
                url: `/response/${responseId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Template"]
        })
    })
})

export const {
    useCreateResponseMutation,
    useGetResponsesByTemplateIdQuery,
    useDeleteResponseByIdMutation,
    useGetResponsesByUserIdQuery,
    useGetResponsesByUserAndTemplateIdQuery,
    useGetResponsesByIdQuery,
    useEditResponseByIdMutation
} = responseApi;
