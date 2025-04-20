import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <div>
            <div className="d-flex justify-content-between px-5 py-3">
                <div className="fs-3 text-theme">{t("profile")}</div>
                <div className="d-flex gap-2 align-items-center">
                    <Button
                        color={location.pathname.includes('responses') ? "warning" : ""}
                        onClick={() => navigate("responses")}
                        className={`border border-warning ${!location.pathname.includes('responses') && "text-theme"}`}
                    >
                        {t("responses")}
                    </Button>
                    <Button
                        color={location.pathname.includes('templates') ? "warning" : ""}
                        onClick={() => navigate("templates")}
                        className={`border border-warning ${!location.pathname.includes('templates') && "text-theme"}`}
                    >
                        {t("templates")}
                    </Button>
                    <Button
                        color={location.pathname.includes('user') ? "warning" : ""}
                        onClick={() => navigate("user")}
                        className={`border border-warning ${!location.pathname.includes('user') && "text-theme"}`}
                    >
                        {t("user")}
                    </Button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile;