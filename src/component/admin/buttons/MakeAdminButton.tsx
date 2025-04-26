import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useMakeAdminByIdsMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";
import { OverlaySpinner } from "../../spinner/OverlaySpinner.tsx";

interface MakeAdminButtonProps {
    userIds: string[];
    setUsers: (users: string[]) => void;
}

export const MakeAdminButton = ({
    userIds,
    setUsers
}: MakeAdminButtonProps) => {
    const { t } = useTranslation();
    const [makeAdminUserByIds, { isLoading }] = useMakeAdminByIdsMutation();

    const handleClick = () => {
        makeAdminUserByIds(userIds)
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
                {t("makeAdmin")}
            </Button>
            {isLoading && <OverlaySpinner />}
        </>
    )
}
