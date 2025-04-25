import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useMakeAdminUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface MakeAdminButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const MakeAdminButton = ({ userIds, setUsers }: MakeAdminButtonProps) => {
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
            disabled={userIds.length === 0 || isLoading}
            color="warning"
        >
            {t("makeAdmin")}
        </Button>
    )
}