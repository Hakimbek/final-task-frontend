import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";

interface StatusProps {
    isActive: boolean;
}

export const Status = ({ isActive }: StatusProps) => {
    const { t } = useTranslation();

    return isActive
        ? <Badge color="success" className="fw-medium">{t("active")}</Badge>
        : <Badge color="danger" className="fw-medium">{t("disabled")}</Badge>;
}