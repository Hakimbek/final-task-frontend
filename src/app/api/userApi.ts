import { baseApi } from "./baseApi.ts";
import { TemplateDto } from "./templateApi.ts";

export interface UserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    image: string;
    templates: TemplateDto[];
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserDto[], void>({
            query: () => `/user`,
            providesTags: ['User', 'Template']
        }),
        getUserById: builder.query<UserDto, string>({
            query: (userId) => `user/${userId}`,
            providesTags: ['User', 'Template']
        }),
        uploadImageById: builder.mutation<void, { url: string, userId: string }>({
            query: ({ url, userId }) => ({
                url: `/user/upload/${userId}`,
                method: 'PUT',
                body: { url }
            }),
            invalidatesTags: ['User']
        }),
        editUserById: builder.mutation<{ message: string }, { firstname: string, lastname: string, userId: string }>({
            query: ({ firstname, lastname, userId }) => ({
                url: `/user/edit/${userId}`,
                method: 'PUT',
                body: { firstname, lastname }
            }),
            invalidatesTags: ['User']
        }),
        deleteUserByIds: builder.mutation<{ message: string }, string[]>({
            query: (userIds) => ({
                url: `/user`,
                method: 'DELETE',
                body: { userIds },
            }),
            invalidatesTags: ['User']
        }),
        activateUserByIds: builder.mutation<{ message: string }, string[]>({
            query: (userIds) => ({
                url: `/user/activate`,
                method: 'PUT',
                body: { userIds },
            }),
            invalidatesTags: ['User']
        }),
        deactivateUserByIds: builder.mutation<{ message: string }, string[]>({
            query: (userIds) => ({
                url: `/user/deactivate`,
                method: 'PUT',
                body: { userIds },
            }),
            invalidatesTags: ['User']
        }),
        makeAdminUserByIds: builder.mutation<{ message: string }, string[]>({
            query: (userIds) => ({
                url: `/user/admin`,
                method: 'PUT',
                body: { userIds },
            }),
            invalidatesTags: ['User']
        }),
        makeUserUserByIds: builder.mutation<{ message: string }, string[]>({
            query: (userIds) => ({
                url: `/user/user`,
                method: 'PUT',
                body: { userIds },
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useGetUserByIdQuery,
    useUploadImageByIdMutation,
    useEditUserByIdMutation,
    useGetAllUsersQuery,
    useDeleteUserByIdsMutation,
    useActivateUserByIdsMutation,
    useDeactivateUserByIdsMutation,
    useMakeAdminUserByIdsMutation,
    useMakeUserUserByIdsMutation
} = userApi;