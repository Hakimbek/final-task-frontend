import { useNavigate } from "react-router-dom";

export const ProfileButton = () => {
    const navigate = useNavigate();

    return (
        <button className="button-theme" onClick={() => navigate("/profile")}>
            <i className="bi bi-person"></i>
        </button>
    )
}
