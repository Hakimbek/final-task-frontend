import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/home")}
            className="button-theme"
        >
            <i className="bi bi-house"></i>
        </button>
    )
}

