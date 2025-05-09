import { Button } from "reactstrap";
import { logout } from "../../../../app/slice/authSlice.ts";
import { toast } from "react-toastify";
import { useDeleteUserByIdMutation } from "../../../../app/api/userApi.ts";
import { useAppDispatch } from "../../../../app/hook/hooks.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DeleteUserButtonProps {
    userId: string;
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
    const [ deleteUserById, { isLoading: isDeleting } ] = useDeleteUserByIdMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDelete = () => {
        deleteUserById(userId)
            .unwrap()
            .then(() => {
                dispatch(logout());
                navigate("/login");
            })
            .catch(() => toast(t("error.common")));
    }

    return (
        <div>
            <Button
                disabled={isDeleting}
                color="warning"
                onClick={handleDelete}
            >
                <i className="bi bi-trash3"></i>
            </Button>
        </div>
    )
}
