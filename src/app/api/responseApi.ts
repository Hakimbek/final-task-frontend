import { baseApi } from "./baseApi.ts";

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
        })
    })
})

export const { useCreateResponseMutation } = responseApi;