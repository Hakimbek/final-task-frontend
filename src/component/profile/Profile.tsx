import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TemplatesButton } from "./buttons/TemplatesButton.tsx";
import { UserButton } from "./buttons/UserButton.tsx";
import { ResponsesButton } from "./buttons/ResponsesButton.tsx";

export const Profile = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="d-flex justify-content-between px-5 py-3">
                <div className="fs-3 text-theme">{t("profile")}</div>
                <div className="d-flex gap-2 align-items-center">
                    <ResponsesButton />
                    <TemplatesButton />
                    <UserButton />
                </div>
            </div>
            <Outlet />
        </div>
    )
}
