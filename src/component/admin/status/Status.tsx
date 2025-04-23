import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";

interface StatusProps {
    isActive: boolean;
    isAdmin: boolean;
}

export const Status = ({ isActive, isAdmin }: StatusProps) => {
    const { t } = useTranslation();

    return (
        <div className="d-flex gap-2 ms-auto">
            <div>
                { isActive
                    ? <Badge color="success" className="fw-medium">{t("active")}</Badge>
                    : <Badge color="danger" className="fw-medium">{t("disabled")}</Badge> }
            </div>
            <div>
                { isAdmin
                    ? <Badge color="warning" className="text-dark fw-medium">{t("admin")}</Badge>
                    : <Badge color="warning" className="text-dark fw-medium">{t("user")}</Badge> }
            </div>
        </div>
    )
}