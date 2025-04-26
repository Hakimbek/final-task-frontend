import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../../app/api/authApi.ts";
import { useFormik } from "formik";
import { SubmitButton } from "../button/SubmitButton.tsx";
import { Label } from "reactstrap";
import { loginValidationSchema } from "./validation.ts";
import { useAppDispatch } from "../../app/hook/hooks.ts";
import { setAuth } from "../../app/slice/authSlice.ts";

export const Login = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        isValid,
        dirty,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
        handleBlur,
        handleChange,
        values
    } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginValidationSchema,
        onSubmit: (
            { email, password },
            { setSubmitting }
        ) => {
            login({ email, password })
                .unwrap()
                .then(({ token, userId }) => {
                    dispatch(setAuth({ token, userId }));
                    navigate("/home");
                })
                .catch(() => toast(t("error.login")))
                .finally(() => setSubmitting(false));
        }
    })

    return (
        <form
            onSubmit={handleSubmit}
            className="d-flex flex-column mx-auto mt-5 gap-3 text-theme"
            style={{ width: "350px" }}
        >
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
                text={t("login")}
            />
        </form>
    )
}
