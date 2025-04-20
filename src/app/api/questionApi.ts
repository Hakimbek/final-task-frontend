import { baseApi } from "./baseApi.ts";

export interface QuestionDto {
    id: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    templateId: string;
    answer?: string;
}

const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createQuestion: builder.mutation<
            { id: string, title: string, description: string, isVisible: boolean, type: string, templateId: string },
            { title: string, description: string, isVisible: boolean, type: string, templateId: string }
        >({
            query: (template) => ({
                url: '/question',
                method: 'POST',
                body: template
            }),
            invalidatesTags: ['Template']
        }),
        getQuestionById: builder.query<
            { id: string, title: string, description: string, isVisible: boolean, type: string, templateId: string },
            string
        >({
            query: (id) => `question/${id}`,
            providesTags: ['Question']
        }),
        deleteQuestionById: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/question/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Question']
        }),
        editQuestionById: builder.mutation<
            { message: string },
            { id: string; title: string, description: string, isVisible: boolean, type: string }
        >({
            query: (question) => ({
                url: `/question/${question.id}`,
                method: 'PUT',
                body: question
            }),
            invalidatesTags: ['Question']
        })
    })
})

export const {
    useCreateQuestionMutation,
    useDeleteQuestionByIdMutation,
    useGetQuestionByIdQuery,
    useEditQuestionByIdMutation
} = questionApi;