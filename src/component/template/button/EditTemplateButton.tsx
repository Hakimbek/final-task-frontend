import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

export const EditTemplateButton = () => {
    const navigate = useNavigate();
    const { templateId = '' } = useParams();

    return (
        <Button
            type="button"
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/template/${templateId}/edit`)}
        >
            <i className="bi bi-gear"></i>
        </Button>
    )
}
