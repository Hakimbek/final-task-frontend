import { useEditQuestionByIdMutation, useGetQuestionByIdQuery } from "../../../app/api/questionApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "../../inputs/Select.tsx";
import { Visibility } from "../../inputs/Visibility.tsx";
import { useTranslation } from "react-i18next";
import { questionTypes } from "./questionTypes.ts";
import { Label, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { useFormik } from "formik";
import { questionValidation } from "./validation.ts";

const EditQuestionForm = () => {
    const { questionId = '', templateId = '', userId } = useParams();
    const { data, isLoading: isQuestionLoading } = useGetQuestionByIdQuery(questionId);
    const [editQuestionById] = useEditQuestionByIdMutation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { handleSubmit, values, handleChange, handleBlur, touched, errors, setFieldValue, isValid, dirty, isSubmitting } = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: data?.title || '',
            description: data?.description || '',
            type: data?.type || 'Text',
            isVisible: data?.isVisible || true
        },
        validationSchema: questionValidation,
        onSubmit: ({ title, description, type, isVisible }, { setSubmitting }) => {
            editQuestionById({ id: questionId, title, description, isVisible, type })
                .unwrap()
                .then(() => {
                    navigate(`/user/${userId}/template/${templateId}`)
                })
                .catch(result => toast(result.data.message))
                .finally(() => setSubmitting(false));
        }
    });

    if (isQuestionLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    )

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
                text={t("edit")}
            />
        </form>
    )
}

export default EditQuestionForm;