import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useMakeAdminUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface MakeAdminButtonProps {
    isDisabled: boolean;
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const MakeAdminButton = ({ isDisabled, userIds, setUsers }: MakeAdminButtonProps) => {
    const { t } = useTranslation();
    const [makeAdminUserByIds, { isLoading }] = useMakeAdminUserByIdsMutation();

    const handleClick = () => {
        makeAdminUserByIds(userIds)
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
            {t("makeAdmin")}
        </Button>
    )
}