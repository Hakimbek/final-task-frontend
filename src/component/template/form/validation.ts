import * as Yup from "yup";

export const templateValidation = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
});
