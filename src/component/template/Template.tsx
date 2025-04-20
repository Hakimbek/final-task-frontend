import { useParams, useNavigate } from 'react-router-dom';
import TemplateHeader from "./header/TemplateHeader.tsx";
import { TemplateSettings } from "./settings/TemplateSettings.tsx";
import Question from "../question/Question.tsx";
import { useGetTemplateByIdQuery } from "../../app/api/templateApi.ts";
import { Spinner } from "reactstrap";
import * as React from "react";
import { useCreateResponseMutation } from "../../app/api/responseApi.ts";
import { toast } from "react-toastify";
import { useAuth } from "../../app/hook/useAuth.ts";
import { useAppSelector } from "../../app/hook/hooks.ts";
import { selectUserId } from "../../app/slice/authSlice.ts";
import { SubmitButton } from "./button/SubmitButton.tsx";

export interface Question {
    id: string;
    type: string;
    question: string;
    isVisible: boolean;
}

const Template = () => {
    const userId = useAppSelector(selectUserId);
    const { user } = useAuth();
    const { templateId = '' } = useParams();
    const { data: template, isLoading: isTemplateLoading } = useGetTemplateByIdQuery(templateId);
    const [createResponse, { isLoading }] = useCreateResponseMutation();
    const navigate = useNavigate();
    const isOwner = userId === template?.user.id;

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
            .then(() =>  navigate(`/home`))
            .catch(() => toast("Something went wrong"));
    }

    if (isLoading || isTemplateLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4">
           <TemplateSettings templateUserId={template?.user.id} />
            <form onSubmit={handleSubmit}>
                <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                    <TemplateHeader
                        title={template?.title}
                        description={template?.description}
                        topic={template?.topic}
                    />
                    {
                        template?.questions?.map(({ id, title, description, isVisible, type, answer }) => (
                            <Question
                                key={id}
                                id={id}
                                title={title}
                                description={description}
                                isVisible={isVisible}
                                type={type}
                                templateUserId={template?.userId}
                                answer={answer}
                            />
                        ))
                    }
                    {!isOwner && <SubmitButton />}
                </div>
            </form>
        </div>
    )
}

export default Template