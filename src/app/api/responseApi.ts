import { baseApi } from "./baseApi.ts";
import { TemplateDto } from "./templateApi.ts";
import { UserDto } from "./userApi.ts";

interface ResponseDto {
    id: string;
    user: UserDto;
    template: TemplateDto;
}

export const responseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createResponse: builder.mutation<
            { message: string },
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
                url: '/response',
                method: 'POST',
                body: response
            }),
            invalidatesTags: ['Template']
        }),
        getResponsesByTemplateId: builder.query<ResponseDto[], string>({
            query: (templateId) => `/response/template/${templateId}`,
            providesTags: ['Template']
        }),
        getResponsesByUserId: builder.query<ResponseDto[], string>({
            query: (userId) => `/response/user/${userId}`,
            providesTags: ['Template']
        }),
        deleteResponseById: builder.mutation<{ message: string }, string>({
            query: (responseId) => ({
                url: `/response/${responseId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Template']
        })
    })
})

export const {
    useCreateResponseMutation,
    useGetResponsesByTemplateIdQuery,
    useDeleteResponseByIdMutation,
    useGetResponsesByUserIdQuery
} = responseApi;