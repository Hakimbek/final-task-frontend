import { baseApi } from "./baseApi.ts";
import { UserDto } from "./userApi.ts";

export interface TemplateDto {
    id?: string;
    title: string;
    description: string;
    topic: string;
    user?: UserDto;
    questions?: {
        id: string;
        title: string;
        description: string;
        isVisible: boolean;
        type: string;
        templateId: string;
        answer: string;
        order: number;
    }[];
    tags: string[];
}

const templateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTemplates: builder.query<TemplateDto[], string>({
            query: (search) => `template?search=${search}`,
            providesTags: ['Template']
        }),
        getTemplateById: builder.query<TemplateDto, string>({
            query: (templateId) => `template/${templateId}`,
            providesTags: ['Template'],
        }),
        createTemplate: builder.mutation<TemplateDto, TemplateDto>({
            query: (template) => ({
                url: '/template',
                method: 'POST',
                body: template
            }),
            invalidatesTags: ['Template']
        }),
        editTemplateById: builder.mutation<{ message: string }, TemplateDto>({
            query: (template) => ({
                url: `/template/${template.id}`,
                method: 'PUT',
                body: template
            }),
            invalidatesTags: ['Template']
        }),
        deleteTemplateById: builder.mutation<{ message: string }, string>({
            query: (templateId) => ({
                url: `/template/${templateId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Template']
        }),
    })
})

export const {
    useGetTemplatesQuery,
    useGetTemplateByIdQuery,
    useCreateTemplateMutation,
    useEditTemplateByIdMutation,
    useDeleteTemplateByIdMutation
} = templateApi;