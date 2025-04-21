import { Label, Spinner } from "reactstrap";
import { Select } from "../../inputs/Select.tsx";
import { Tags } from "../../inputs/Tags.tsx";
import { useGetAllTopicsQuery } from "../../../app/api/topicApi.ts";
import { useCreateTemplateMutation } from "../../../app/api/templateApi.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { templateValidation } from "./validation.ts";

const CreateTemplateForm = () => {
    const { data: topics, isLoading } = useGetAllTopicsQuery();
    const [createTemplate] = useCreateTemplateMutation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting, isValid, dirty, setFieldValue } = useFormik({
        initialValues: { title: '', description: '', topic: 'Test', tags: []  },
        validationSchema: templateValidation,
        onSubmit: ({ title, description, topic, tags }, { setSubmitting }) => {
            createTemplate({ title, description, topic, tags })
                .unwrap()
                .then(result => {
                    navigate(`/template/${result.id}`)
                })
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
                text={t("create")}
            />
        </form>
    )
}

export default CreateTemplateForm;