import { baseApi } from "./baseApi.ts";
import { TemplateDto } from "./templateApi.ts";

export interface UserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    image: string;
    templates: TemplateDto[];
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserDto, string>({
            query: (id) => `user/${id}`,
            providesTags: ['User', 'Template']
        }),
        uploadImage: builder.mutation<void, { url: string, id: string }>({
            query: ({ url, id }) => ({
                url: `/user/upload/${id}`,
                method: 'PUT',
                body: { url }
            }),
            invalidatesTags: ['User']
        }),
        editUser: builder.mutation<{ message: string }, { firstname: string, lastname: string, id: string }>({
            query: ({ firstname, lastname, id }) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: { firstname, lastname }
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useGetUserByIdQuery,
    useUploadImageMutation,
    useEditUserMutation,
} = userApi;