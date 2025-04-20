import { baseApi } from "./baseApi.ts";

export interface QuestionDto {
    id?: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    templateId?: string;
    answer?: string;
}

const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createQuestion: builder.mutation<QuestionDto, QuestionDto>({
            query: (question) => ({
                url: '/question',
                method: 'POST',
                body: question
            }),
            invalidatesTags: ['Template']
        }),
        getQuestionById: builder.query<QuestionDto, string>({
            query: (questionId) => `question/${questionId}`,
            providesTags: ['Template']
        }),
        deleteQuestionById: builder.mutation<{ message: string }, string>({
            query: (questionId) => ({
                url: `/question/${questionId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Template']
        }),
        editQuestionById: builder.mutation<{ message: string }, QuestionDto>({
            query: (question) => ({
                url: `/question/${question.id}`,
                method: 'PUT',
                body: question
            }),
            invalidatesTags: ['Template']
        })
    })
})

export const {
    useCreateQuestionMutation,
    useDeleteQuestionByIdMutation,
    useGetQuestionByIdQuery,
    useEditQuestionByIdMutation
} = questionApi;