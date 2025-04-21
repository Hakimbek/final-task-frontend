import { baseApi } from "./baseApi.ts";
import { TemplateDto } from "./templateApi.ts";
import { UserDto } from "./userApi.ts";

interface ResponseDto {
    id: number;
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
            query: (templateId) => `/response/${templateId}`,
            providesTags: ['Template']
        })
    })
})

export const {
    useCreateResponseMutation,
    useGetResponsesByTemplateIdQuery
} = responseApi;