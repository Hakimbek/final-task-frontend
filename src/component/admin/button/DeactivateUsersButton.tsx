import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDeactivateUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface DeactivateUsersButtonProps {
    isDisabled: boolean;
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const DeactivateUsersButton = ({ isDisabled, userIds, setUsers }: DeactivateUsersButtonProps) => {
    const { t } = useTranslation();
    const [deactivateUserByIds, { isLoading }] = useDeactivateUserByIdsMutation();

    const handleClick = () => {
        deactivateUserByIds(userIds)
            .unwrap()
            .then(response => {
                toast(response.message);
                setUsers([]);
            })
            .catch(response => toast(response.data.message));
    }

    return (
        <Button
            onClick={handleClick}
            disabled={isDisabled || isLoading}
            color="warning"
        >
            {t("disable")}
        </Button>
    )
}