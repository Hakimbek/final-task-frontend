import { useTranslation } from "react-i18next";
import { Select } from "../../inputs/Select.tsx";
import { Visibility } from "../../inputs/Visibility.tsx";
import { Label } from "reactstrap";
import { useCreateQuestionMutation } from "../../../app/api/questionApi.ts";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { questionValidation } from "./validation.ts";
import { questionTypes } from "./questionTypes.ts";

const AddQuestionForm = () => {
    const { t } = useTranslation();
    const [createQuestion] = useCreateQuestionMutation();
    const navigate = useNavigate();
    const { templateId, userId } = useParams();
    const { handleSubmit, values, handleChange, handleBlur, touched, errors, setFieldValue, isValid, dirty, isSubmitting } = useFormik({
        initialValues: { title: '', description: '', type: 'Text', isVisible: true },
        validationSchema: questionValidation,
        onSubmit: ({ title, description, type, isVisible }, { setSubmitting }) => {
            createQuestion({ title, description, type, isVisible, templateId: templateId || '' })
                .unwrap()
                .then(() => navigate(`/user/${userId}/template/${templateId}`))
                .catch(result => toast(result.data.message))
                .finally(() => setSubmitting(false));
        }
    });

    return (
        <form
            onSubmit={handleSubmit}
            className="d-flex flex-column mx-auto mt-5 gap-3 text-theme"
            style={{ width: "350px" }}
        >
            <div className="d-flex flex-column">
                <Label>{t("title")}</Label>
                <input
                    className="input-theme"
                    type="text"
                    name="title"
                    placeholder={t("title")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                />
                {touched.title && errors.title && <div className="text-danger">{t("error.title")}</div>}
            </div>
            <div className="d-flex flex-column">
                <Label>{t("description")}</Label>
                <textarea
                    className="input-theme"
                    name="description"
                    placeholder={t("description")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
                {touched.description && errors.description && <div className="text-danger">{t("error.description")}</div>}
            </div>
            <Select value={values.type} fieldName="type" setValue={setFieldValue} data={questionTypes} label={t("type")} />
            <Visibility isVisible={values.isVisible} setIsVisible={setFieldValue} />
            <SubmitButton
                isDisabled={isSubmitting || !(isValid && dirty)}
                isSubmitting={isSubmitting}
                text={t("add")}
            />
        </form>
    )
}

export default AddQuestionForm;