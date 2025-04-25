import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useMakeUserUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";

interface MakeUserButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const MakeUserButton = ({ userIds, setUsers }: MakeUserButtonProps) => {
    const { t } = useTranslation();
    const [makeUserUserByIds, { isLoading }] = useMakeUserUserByIdsMutation();

    const handleClick = () => {
        makeUserUserByIds(userIds)
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
            {t("makeUser")}
        </Button>
    )
}
