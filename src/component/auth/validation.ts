import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

export const signupValidationSchema = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});
