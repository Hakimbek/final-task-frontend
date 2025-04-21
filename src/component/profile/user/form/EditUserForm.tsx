import { useAuth } from "../../../../app/hook/useAuth.ts";
import { useTranslation } from "react-i18next";
import { Label, Spinner } from "reactstrap";
import { useEditUserMutation } from "../../../../app/api/userApi.ts";
import { useAppSelector } from "../../../../app/hook/hooks.ts";
import { selectUserId } from "../../../../app/slice/authSlice.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userValidation } from "./validation.ts";
import { SubmitButton } from "../../../button/SubmitButton.tsx";

export const EditUserForm = () => {
    const userId = useAppSelector(selectUserId) || ''
    const { t } = useTranslation();
    const { isLoading, user } = useAuth();
    const [editUser] = useEditUserMutation();
    const navigate = useNavigate();

    const { handleSubmit, handleChange, handleBlur, values, touched, isSubmitting, isValid, errors, dirty } = useFormik({
        enableReinitialize: true,
        initialValues: { firstname: user?.firstname || '', lastname: user?.lastname || '' },
        validationSchema: userValidation,
        onSubmit: ({ firstname, lastname }, { setSubmitting }) => {
            editUser({ firstname, lastname, id: userId })
                .unwrap()
                .then(() => navigate("/profile/user"))
                .catch(result => toast(result.data.message))
                .finally(() => setSubmitting(false));
        }
    })

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="d-flex flex-column mx-auto mt-5 gap-3 text-theme"
            style={{ width: "350px" }}
        >
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
            <SubmitButton
                isDisabled={isSubmitting || !(isValid && dirty)}
                isSubmitting={isSubmitting}
                text={t("edit")}
            />
        </form>
    )
}