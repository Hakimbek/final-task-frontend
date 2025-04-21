import * as Yup from "yup";

export const questionValidation = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
});
