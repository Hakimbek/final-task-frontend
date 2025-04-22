import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { selectUserId } from "../../../app/slice/authSlice.ts";
import { useAppSelector } from "../../../app/hook/hooks.ts";

export const CreateTemplateButton = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const userId = useAppSelector(selectUserId);

    return (
        <Button color="warning" onClick={() => navigate(`/user/${userId}/template/create`)}>
            {t("createTemplate")}
        </Button>
    )
}
