import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDeleteUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface DeleteUsersProps {
    isDisabled: boolean;
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const DeleteUsersButton = ({ isDisabled, userIds, setUsers }: DeleteUsersProps) => {
    const { t } = useTranslation();
    const [deleteUserByIds, { isLoading }] = useDeleteUserByIdsMutation();

    const handleDelete = () => {
        deleteUserByIds(userIds)
            .unwrap()
            .then(response => {
                toast(response.message);
                setUsers([]);
            })
            .catch(response => toast(response.data.message));
    }

    return (
        <Button
            onClick={handleDelete}
            disabled={isDisabled || isLoading}
            color="warning"
        >
            {t("delete")}
        </Button>
    )
}