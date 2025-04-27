import { useNavigate, useParams } from "react-router-dom";
import { useDeleteQuestionByIdMutation } from "../../../app/api/questionApi.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface QuestionSettingsProps {
    id: string;
}

export const QuestionSettings = ({ id }: QuestionSettingsProps) => {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const [deleteQuestion, { isLoading: isQuestionDeleting }] = useDeleteQuestionByIdMutation();
    const { t } = useTranslation();

    const handleDelete = () => {
        deleteQuestion(id)
            .unwrap()
            .then(() => toast(t("success.deleted")))
            .catch(() => toast(t("error.common")));
    }

    return (
        <div className="question-settings px-2">
            <button
                type="button"
                className="button-theme"
                onClick={() => navigate(`/template/${templateId}/question/${id}/edit`)}
            >
                <i className="bi bi-gear"></i>
            </button>
            <button
                type="button"
                className="button-theme"
                onClick={handleDelete}
                disabled={isQuestionDeleting}
            >
                <i className="bi bi-trash3"></i>
            </button>
        </div>
    )
}
