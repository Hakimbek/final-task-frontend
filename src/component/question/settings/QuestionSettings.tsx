import { useNavigate, useParams } from "react-router-dom";
import { useDeleteQuestionByIdMutation } from "../../../app/api/questionApi.ts";
import { toast } from "react-toastify";

interface QuestionSettingsProps {
    id: string;
}

export const QuestionSettings = ({ id }: QuestionSettingsProps) => {
    const navigate = useNavigate();
    const { templateId = '' } = useParams();
    const [deleteQuestion, { isLoading: isQuestionDeleting }] = useDeleteQuestionByIdMutation();

    const handleDelete = () => {
        deleteQuestion(id)
            .unwrap()
            .then(() => toast("Question deleted"))
            .catch(() => toast("Something went wrong"));
    }

    return (
        <div className="question-settings px-2">
            <button
                className="button-theme"
                onClick={() => navigate(`/template/${templateId}/question/${id}/edit`)}
            >
                <i className="bi bi-gear"></i>
            </button>
            <button className="button-theme" onClick={handleDelete} disabled={isQuestionDeleting}>
                <i className="bi bi-trash3"></i>
            </button>
        </div>
    )
}
