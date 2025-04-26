import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useActivateUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface ActivateUsersButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const ActivateUsersButton = ({
    userIds,
    setUsers
}: ActivateUsersButtonProps) => {
    const { t } = useTranslation();
    const [activateUserByIds, { isLoading }] = useActivateUserByIdsMutation();

    const handleClick = () => {
        activateUserByIds(userIds)
            .unwrap()
            .then(() => {
                toast(t("success.status"))
                setUsers([]);
            })
            .catch(() => toast(t("error.common")));
    }

    return (
        <Button
            onClick={handleClick}
            disabled={userIds.length === 0 || isLoading}
            color="warning"
        >
            {t("activate")}
        </Button>
    )
}
