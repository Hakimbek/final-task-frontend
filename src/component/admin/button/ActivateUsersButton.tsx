import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useActivateUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface ActivateUsersButtonProps {
    isDisabled: boolean;
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const ActivateUsersButton = ({ isDisabled, userIds, setUsers }: ActivateUsersButtonProps) => {
    const { t } = useTranslation();
    const [activateUserByIds, { isLoading }] = useActivateUserByIdsMutation();

    const handleClick = () => {
        activateUserByIds(userIds)
            .unwrap()
            .then(response => {
                toast(response.message)
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
            {t("activate")}
        </Button>
    )
}