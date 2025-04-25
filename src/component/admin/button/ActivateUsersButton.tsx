import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useActivateUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface ActivateUsersButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const ActivateUsersButton = ({ userIds, setUsers }: ActivateUsersButtonProps) => {
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
            disabled={userIds.length === 0 || isLoading}
            color="warning"
        >
            {t("activate")}
        </Button>
    )
}