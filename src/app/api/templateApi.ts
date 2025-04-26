import { baseApi } from "./baseApi.ts";
import { MessageDto } from "../dto/Message.dto.ts";
import { TemplateDto, CreateTemplateDto, EditTemplateDto } from "../dto/Template.dto.ts";

const templateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTemplates: builder.query<TemplateDto[], string>({
            query: (search) => `template?search=${search}`,
            providesTags: ["Template"]
        }),
        getTemplateById: builder.query<TemplateDto, string>({
            query: (templateId) => `template/${templateId}`,
            providesTags: ["Template"],
        }),
        createTemplate: builder.mutation<TemplateDto, CreateTemplateDto>({
            query: (template) => ({
                url: "/template",
                method: "POST",
                body: template
            }),
            invalidatesTags: ["Template"]
        }),
        editTemplateById: builder.mutation<MessageDto, EditTemplateDto>({
            query: (template) => ({
                url: `/template/${template.id}`,
                method: "PUT",
                body: template
            }),
            invalidatesTags: ["Template"]
        }),
        deleteTemplateById: builder.mutation<MessageDto, string>({
            query: (templateId) => ({
                url: `/template/${templateId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Template"]
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
