import { baseApi } from "./baseApi.ts";
import { MessageDto } from "../dto/Message.dto.ts";
import { CreateQuestionDto, QuestionDto, EditQuestionDto, ReorderDto } from "../dto/Question.dto.ts";

const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createQuestion: builder.mutation<QuestionDto, CreateQuestionDto>({
            query: (question) => ({
                url: "/question",
                method: "POST",
                body: question
            }),
            invalidatesTags: ["Template"]
        }),
        getQuestionById: builder.query<QuestionDto, string>({
            query: (questionId) => `question/${questionId}`,
            providesTags: ["Template"]
        }),
        deleteQuestionById: builder.mutation<MessageDto, string>({
            query: (questionId) => ({
                url: `/question/${questionId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Template"]
        }),
        editQuestionById: builder.mutation<MessageDto, EditQuestionDto>({
            query: (question) => ({
                url: `/question/${question.id}`,
                method: "PUT",
                body: question
            }),
            invalidatesTags: ["Template"]
        }),
        reorder: builder.mutation<MessageDto, ReorderDto>({
            query: (reorder) => ({
                url: "/question/reorder",
                method: "PATCH",
                body: reorder
            }),
            invalidatesTags: ["Template"]
        }),
    })
})

export const {
    useCreateQuestionMutation,
    useDeleteQuestionByIdMutation,
    useGetQuestionByIdQuery,
    useEditQuestionByIdMutation,
    useReorderMutation
} = questionApi;
