import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

export const EditTemplateButton = () => {
    const navigate = useNavigate();
    const { templateId = '', userId = '' } = useParams();

    return (
        <Button
            type="button"
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/user/${userId}/template/${templateId}/edit`)}
        >
            <i className="bi bi-gear"></i>
        </Button>
    )
}