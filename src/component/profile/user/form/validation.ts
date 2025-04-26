import * as Yup from "yup";

export const userValidation = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
});
