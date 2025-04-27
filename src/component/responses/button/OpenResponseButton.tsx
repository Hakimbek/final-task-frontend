import { useNavigate } from "react-router-dom";

interface OpenResponseButtonProps {
    responseId: string;
}

export const OpenResponseButton = ({ responseId }: OpenResponseButtonProps) => {
    const navigate = useNavigate();

    return (
        <button
            className="button-theme"
            onClick={() => navigate(`/response/${responseId}`)}
        >
            <i className="bi bi-eye"></i>
        </button>
    )
}
