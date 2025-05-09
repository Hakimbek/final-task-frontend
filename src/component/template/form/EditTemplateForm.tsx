import { useGetTemplateByIdQuery, useEditTemplateByIdMutation } from "../../../app/api/templateApi.ts";
import { useGetAllTopicsQuery } from "../../../app/api/topicApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "reactstrap";
import { Select } from "../../inputs/Select.tsx";
import { Tags } from "../../inputs/Tags.tsx";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { templateValidation } from "./validation.ts";
import { Spinner } from "../../spinner/Spinner.tsx";

export const EditTemplateForm = () => {
    const { templateId = '' } = useParams();
    const { data, isLoading: isTemplateLoading } = useGetTemplateByIdQuery(templateId);
    const { data: topics, isLoading: isTopicsLoading } = useGetAllTopicsQuery();
    const [editTemplate] = useEditTemplateByIdMutation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
        dirty,
        setFieldValue
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: data?.title || '',
            description: data?.description || '',
            topic: data?.topic || 'Test',
            tags: data?.tags || []
        },
        validationSchema: templateValidation,
        onSubmit: (
            { title, description, topic, tags },
            { setSubmitting }
        ) => {
            editTemplate({ id: templateId, title, description, topic, tags })
                .unwrap()
                .then(() => navigate(`/template/${templateId}`))
                .catch(result => toast(result.data.message))
                .finally(() => setSubmitting(false));
        }
    })

    if (isTopicsLoading || isTemplateLoading) return <Spinner />;

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
            <Select value={values.topic} fieldName="topic" setValue={setFieldValue} data={topics} label={t("topic")} />
            <Tags tags={values.tags} setTags={setFieldValue} />
            <SubmitButton
                isDisabled={isSubmitting || !(isValid && dirty)}
                isSubmitting={isSubmitting}
                text={t("edit")}
            />
        </form>
    )
}
