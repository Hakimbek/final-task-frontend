import { baseApi } from "./baseApi.ts";

const topicApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTopics: builder.query<{ id: string, name: string }[], void>({
            query: () => 'topic',
        }),
    })
})

export const { useGetAllTopicsQuery } = topicApi;