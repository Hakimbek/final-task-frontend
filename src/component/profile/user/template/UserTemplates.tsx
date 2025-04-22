import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../app/hook/useAuth.ts";
import { Spinner } from "reactstrap";

export const UserTemplates = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

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
