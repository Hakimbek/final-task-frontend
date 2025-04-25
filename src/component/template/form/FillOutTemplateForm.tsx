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

export const FillOutTemplateForm = () => {
    const { user, isLoading } = useAuth();
    const { templateId = '' } = useParams();
    const [createResponse, { isLoading: isResponseCreating }] = useCreateResponseMutation();
    const { data: template, isLoading: isTemplateLoading } = useGetTemplateByIdQuery(templateId);
    const { t } = useTranslation();
    const isOwner = user?.id === template?.user?.id;

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
            .then(result =>  toast(result.message))
            .catch(result => toast(result.data.message));
    }

    if (isTemplateLoading || isLoading) return <Spinner />;

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4">
            <form onSubmit={handleSubmit}>
                <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                    {
                        template?.questions?.map(({ id, title, description, isVisible, type, answer = '' }) => (
                            <Question
                                key={id}
                                id={id || ''}
                                title={title}
                                description={description}
                                isVisible={isVisible}
                                type={type}
                                templateUserId={template?.user?.id}
                                answer={answer}
                            />
                        ))
                    }
                    {(user?.isAdmin || (!isOwner && user)) && (
                        <SubmitButton
                            isDisabled={isResponseCreating}
                            isSubmitting={isResponseCreating}
                            text={t("submit")}
                        />
                    )}
                </div>
            </form>
        </div>
    )
}