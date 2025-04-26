import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDeactivateUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";
import { OverlaySpinner } from "../../spinner/OverlaySpinner.tsx";

interface DeactivateUsersButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const DeactivateUsersButton = ({
    userIds,
    setUsers
}: DeactivateUsersButtonProps) => {
    const { t } = useTranslation();
    const [deactivateUserByIds, { isLoading }] = useDeactivateUserByIdsMutation();

    const handleClick = () => {
        deactivateUserByIds(userIds)
            .unwrap()
            .then(() => {
                toast(t("success.status"));
                setUsers([]);
            })
            .catch(() => toast(t("error.common")));
    }

    return (
        <>
            <Button
                onClick={handleClick}
                disabled={userIds.length === 0 || isLoading}
                color="warning"
            >
                {t("disable")}
            </Button>
            {isLoading && <OverlaySpinner />}
        </>
    )
}
