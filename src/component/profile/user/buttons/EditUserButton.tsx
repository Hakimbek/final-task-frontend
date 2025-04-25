import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const EditUserButton = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button
                color="warning"
                onClick={() => navigate(`/user/edit`)}
            >
                <i className="bi bi-gear"></i>
            </Button>
        </div>
    )
}
