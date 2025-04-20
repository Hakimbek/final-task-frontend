import { Button } from "reactstrap";
import { toast } from "react-toastify";
import { useDeleteTemplateByIdMutation } from "../../../app/api/templateApi.ts";
import { useNavigate, useParams } from "react-router-dom";


export const DeleteTemplateButton = () => {
    const navigate = useNavigate();
    const { templateId = '' } = useParams();
    const [deleteTemplate, { isLoading: isTemplateDeleting }] = useDeleteTemplateByIdMutation();

    const handleDelete = () => {
        deleteTemplate(templateId)
            .unwrap()
            .then(() => navigate('/home'))
            .catch(result => toast(result.data.message));
    }

    return (
        <Button
            disabled={isTemplateDeleting}
            color="warning"
            className="rounded-pill"
            onClick={handleDelete}
        >
            <i className="bi bi-trash3"></i>
        </Button>
    )
}