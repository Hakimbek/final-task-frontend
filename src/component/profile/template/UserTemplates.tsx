import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hook/useAuth.ts";
import { Spinner } from "../../spinner/Spinner.tsx";

export const UserTemplates = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    if (isLoading) return <Spinner />;

    return (
        <div className="px-5 py-3 d-flex flex-column gap-4">
            {user?.templates?.map(({ title, id }) => (
                <div
                    key={id}
                    className="d-flex cursor-pointer"
                    onClick={() => navigate(`/user/${user.id}/template/${id}`)}
                >
                    <div className="p-4 bg-warning rounded-start d-flex align-items-center">
                        <i className="bi bi-journal-text"></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center template-theme w-100 p-4 rounded-end text-theme">
                        <div>{title}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
