import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useMakeUserByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";
import { OverlaySpinner } from "../../spinner/OverlaySpinner.tsx";

interface MakeUserButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const MakeUserButton = ({
    userIds,
    setUsers
}: MakeUserButtonProps) => {
    const { t } = useTranslation();
    const [makeUserUserByIds, { isLoading }] = useMakeUserByIdsMutation();

    const handleClick = () => {
        makeUserUserByIds(userIds)
            .unwrap()
            .then(() => {
                toast(t("success.role"));
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
                {t("makeUser")}
            </Button>
            {isLoading && <OverlaySpinner />}
        </>
    )
}
