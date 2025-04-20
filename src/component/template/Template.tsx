import { useParams } from 'react-router-dom';
import TemplateHeader from "./header/TemplateHeader.tsx";
import { TemplateSettings } from "./settings/TemplateSettings.tsx";
import { Question } from "../question/Question.tsx";
import { useGetTemplateByIdQuery } from "../../app/api/templateApi.ts";
import { Spinner } from "reactstrap";
import * as React from "react";
import { useCreateResponseMutation } from "../../app/api/responseApi.ts";
import { toast } from "react-toastify";
import { useAuth } from "../../app/hook/useAuth.ts";
import { useAppSelector } from "../../app/hook/hooks.ts";
import { selectUserId } from "../../app/slice/authSlice.ts";
import { SubmitButton } from "../auth/button/SubmitButton.tsx";
import { useTranslation } from "react-i18next";

const Template = () => {
    const userId = useAppSelector(selectUserId);
    const { user, isLoading } = useAuth();
    const { templateId = '' } = useParams();
    const { data: template, isLoading: isTemplateLoading } = useGetTemplateByIdQuery(templateId);
    const [createResponse, { isLoading: isResponseCreating }] = useCreateResponseMutation();
    const isOwner = userId === template?.user?.id;
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const answers = Object.entries(data).map(([key, value]) => ({
            questionId: key,
            answer: String(value),
        }))

        createResponse({ userId: String(user?.id), templateId, answers })
            .unwrap()
            .then(result =>  toast(result.message))
            .catch(result => toast(result.data.message));
    }

    if (isTemplateLoading || isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4">
           <TemplateSettings
               templateUserId={template?.user?.id}
               firstname={template?.user?.firstname}
               lastname={template?.user?.lastname}
               isAdmin={user?.isAdmin}
           />
            <form onSubmit={handleSubmit}>
                <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                    <TemplateHeader
                        title={template?.title}
                        description={template?.description}
                        topic={template?.topic}
                    />
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
                    {!isOwner && user && (
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

export default Template