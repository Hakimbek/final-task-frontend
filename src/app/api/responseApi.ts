import { baseApi } from "./baseApi.ts";
import { UserDto } from "../dto/User.dto.ts";
import { TemplateDto } from "../dto/Template.dto.ts";
import { MessageDto } from "../dto/Message.dto.ts";

interface ResponseDto {
    id: string;
    user: UserDto;
    template: TemplateDto;
}

export const responseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createResponse: builder.mutation<
            MessageDto,
            {
                userId: string;
                templateId: string;
                answers: {
                    questionId: string;
                    answer: string;
                }[]
            }
        >({
            query: (response) => ({
                url: "/response",
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
            query: ({ userId, templateId }) => `/response/user/${userId}/template/${templateId}`,
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
} = responseApi;
