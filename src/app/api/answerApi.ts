import { baseApi } from "./baseApi.ts";

interface AnswerDto {
    id: string;
    value: string;
}

export const answerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnswerByResponseAndQuestionId: builder.query<AnswerDto, { responseId: string | undefined; questionId: string }>({
            query: ({ responseId, questionId }) =>
                `/answer/response/${responseId}/question/${questionId}`,
        })
    })
})

export const { useGetAnswerByResponseAndQuestionIdQuery } = answerApi;
