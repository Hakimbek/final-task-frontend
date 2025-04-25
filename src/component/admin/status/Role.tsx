import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";

interface RoleProps {
    isAdmin: boolean;
}

export const Role = ({ isAdmin }: RoleProps) => {
    const { t } = useTranslation();

    return isAdmin
        ? <Badge color="warning" className="text-dark fw-medium">{t("admin")}</Badge>
        : <Badge color="warning" className="text-dark fw-medium">{t("user")}</Badge>;
}