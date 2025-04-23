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
            onClick={() => navigate(`/user/${userId}/template/${templateId}`)}
        >
            <i className="bi bi-eye"></i>
        </button>
    )
}