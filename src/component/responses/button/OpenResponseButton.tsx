import { useNavigate } from "react-router-dom";

interface OpenResponseButtonProps {
    templateId: string;
    userId: string;
}

export const OpenResponseButton = ({ templateId, userId }: OpenResponseButtonProps) => {
    const navigate = useNavigate();

    return (
        <button
            className="button-theme"
            onClick={() => navigate(`/template/${templateId}/${userId}`)}
        >
            <i className="bi bi-eye"></i>
        </button>
    )
}