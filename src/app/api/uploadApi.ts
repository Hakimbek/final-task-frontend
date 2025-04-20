import { baseApi } from "./baseApi.ts";

const uploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSignedUrl: builder.query<{ signedUrl: string, key: string }, { fileName: string; fileType: string }>({
            query: ({ fileName, fileType }) => ({
                url: `upload/signed-url?fileName=${fileName}&fileType=${fileType}`,
                method: 'GET',
            }),
        }),
    })
})

export const { useLazyGetSignedUrlQuery } = uploadApi;