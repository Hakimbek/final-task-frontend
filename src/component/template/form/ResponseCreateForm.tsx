import { Question } from "../../question/Question.tsx";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import * as React from "react";
import { toast } from "react-toastify";
import { useCreateResponseMutation } from "../../../app/api/responseApi.ts";
import { useAuth } from "../../../app/hook/useAuth.ts";
import { Spinner } from "../../spinner/Spinner.tsx";
import { useGetTemplateByIdQuery } from "../../../app/api/templateApi.ts";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TemplateHeader } from "../header/TemplateHeader.tsx";

export const ResponseCreateForm = () => {
    const { user, isLoading } = useAuth();
    const { templateId = '' } = useParams();
    const [createResponse, { isLoading: isResponseCreating }] = useCreateResponseMutation();
    const { data: template, isLoading: isTemplateLoading } = useGetTemplateByIdQuery(templateId);
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const answers = Object.entries(data).map(([key, value]) => ({
            questionId: key,
            answer: String(value),
        }))

        createResponse({ userId: user?.id || '', templateId, answers })
            .unwrap()
            .then(() =>  toast(t("success.thank")))
            .catch(() => toast(t("error.common")));
    }

    if (isTemplateLoading || isLoading) return <Spinner />;

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4 mt-4">
            <form onSubmit={handleSubmit}>
                <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                    <TemplateHeader
                        title={template?.title}
                        description={template?.description}
                        topic={template?.topic}
                    />
                    {
                        template?.questions?.map(({ id, title, description, isVisible, type }) => (
                            <Question
                                key={id}
                                id={id || ''}
                                title={title}
                                description={description}
                                isVisible={isVisible}
                                type={type}
                                templateUserId={template?.user?.id}
                            />
                        ))
                    }
                    <SubmitButton
                        isDisabled={isResponseCreating}
                        isSubmitting={isResponseCreating}
                        text={t("submit")}
                    />
                </div>
            </form>
        </div>
    )
}
