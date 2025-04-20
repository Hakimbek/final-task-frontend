import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useAppDispatch } from "../../../app/hook/hooks.ts";
import { logout } from "../../../app/slice/authSlice.ts";

export const LogoutButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <Button color="warning" onClick={handleLogout} size="sm">
            {t("logout")}
        </Button>
    )
}
