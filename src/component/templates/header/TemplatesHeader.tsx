import { CreateTemplateButton } from "../button/CreateTemplateButton.tsx";
import { useAuth } from "../../../app/hook/useAuth.ts";
import { useTranslation } from "react-i18next";
import { Spinner } from "reactstrap";

export const TemplatesHeader = () => {
    const { user, isLoading} = useAuth();
    const { t } = useTranslation();

    return (
        <div className="d-flex justify-content-between">
            <div className="text-theme fs-3">{t("templates")}</div>
            <div>{user && <CreateTemplateButton />}</div>
            {isLoading && <Spinner color="warning" size="sm" type="grow" />}
        </div>
    )
}