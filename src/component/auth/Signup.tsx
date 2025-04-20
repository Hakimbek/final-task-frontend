import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSignupMutation } from "../../app/api/authApi.ts";
import { useFormik } from "formik";
import { SubmitButton } from "./button/SubmitButton.tsx";
import { signupValidationSchema } from "./validation.ts";
import { Label } from "reactstrap";

export const Signup = () => {
    const [signup] = useSignupMutation();
    const { t } = useTranslation();
    const { isSubmitting, values, isValid, dirty, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
        initialValues: { firstname: '', lastname: '', email: '', password: '' },
        validationSchema: signupValidationSchema,
        onSubmit: ({ firstname, lastname, email, password }, { setSubmitting, resetForm }) => {
            signup({ email, password, firstname, lastname })
                .unwrap()
                .then((result) => {
                    resetForm();
                    toast(result.message)
                })
                .catch(result => toast(result.data.message))
                .finally(() => setSubmitting(false));
        }
    })

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column mx-auto mt-5 gap-3 text-theme" style={{ width: "350px" }}>
            <div className="d-flex flex-column">
                <Label>{t("firstname")}</Label>
                <input
                    className="input-theme"
                    type="text"
                    name="firstname"
                    placeholder={t("firstname")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                />
                {touched.firstname && errors.firstname && <div className="text-danger">{t("error.firstname")}</div>}
            </div>
            <div className="d-flex flex-column">
                <Label>{t("lastname")}</Label>
                <input
                    className="input-theme"
                    type="text"
                    name="lastname"
                    placeholder={t("lastname")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                />
                {touched.lastname && errors.lastname && <div className="text-danger">{t("error.lastname")}</div>}
            </div>
            <div className="d-flex flex-column">
                <Label>{t("email")}</Label>
                <input
                    className="input-theme"
                    type="email"
                    name="email"
                    placeholder={t("email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {touched.email && errors.email && <div className="text-danger">{t("error.email")}</div>}
            </div>
            <div className="d-flex flex-column">
                <Label>{t("password")}</Label>
                <input
                    className="input-theme"
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {touched.password && errors.password && <div className="text-danger">{t("error.password")}</div>}
            </div>
            <SubmitButton
                isDisabled={isSubmitting || !(isValid && dirty)}
                isSubmitting={isSubmitting}
                text={t("signup")}
            />
        </form>
    )
}
