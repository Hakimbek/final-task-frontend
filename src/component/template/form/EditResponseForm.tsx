import { TemplateHeader } from "../header/TemplateHeader.tsx";
import { Question } from "../../question/Question.tsx";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGetResponsesByIdQuery, useEditResponseByIdMutation } from "../../../app/api/responseApi.ts";
import { Spinner } from "../../spinner/Spinner.tsx";
import * as React from "react";
import { toast } from "react-toastify";

export const EditResponseForm = () => {
    const { t } = useTranslation();
    const { responseId = '' } = useParams();
    const { data, isLoading } = useGetResponsesByIdQuery(responseId);
    const [editResponseById, { isLoading: isResponseEditing }] = useEditResponseByIdMutation();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const answers = Object.entries(data).map(([key, value]) => ({
            questionId: key,
            answer: String(value),
        }))

        editResponseById({ responseId, answers })
            .unwrap()
            .then(() => {
                toast(t("success.thank"));
                navigate("/home");
            })
            .catch(() => toast(t("error.common")));
    }

    if (isLoading) return <Spinner />;

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4 mt-4">
            <form onSubmit={handleSubmit}>
                <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                    <TemplateHeader
                        title={data?.template?.title}
                        description={data?.template?.description}
                        topic={data?.template?.topic}
                    />
                    {
                        data?.template?.questions?.map(({ id, title, description, isVisible, type }) => (
                            <Question
                                key={id}
                                id={id || ''}
                                title={title}
                                description={description}
                                isVisible={isVisible}
                                type={type}
                                templateUserId={data?.template?.user?.id}
                            />
                        ))
                    }
                    <SubmitButton
                        isDisabled={isResponseEditing}
                        isSubmitting={isResponseEditing}
                        text={t("edit")}
                    />
                </div>
            </form>
        </div>
    )
}
