import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

export const CreateQuestionButton = () => {
    const navigate = useNavigate();
    const { templateId } = useParams();

    return (
        <Button
            type="button"
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/template/${templateId}/question/create`)}
        >
            <i className="bi bi-plus-lg"></i>
        </Button>
    )
}
