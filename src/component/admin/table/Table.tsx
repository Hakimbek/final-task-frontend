import { Input } from "reactstrap";
import { UserDto } from "../../../app/api/userApi.ts";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Status } from "../status/Status.tsx";
import { Role } from "../status/Role.tsx";

interface TableProps {
    users: UserDto[];
    usersId: string[];
    setUsersId: React.Dispatch<React.SetStateAction<string[]>>
}

export const Table = ({ users, usersId, setUsersId }: TableProps) => {
    const { t } = useTranslation();

    const handleSelect = (userId: string) => {
        if (!usersId.includes(userId)) {
            setUsersId(prevState => [...prevState, userId]);
        } else {
            setUsersId(prevState => prevState.filter(id => id !== userId));
        }
    }

    const toggleAll = () => {
        if (usersId.length !== users.length) {
            setUsersId(users.map(user => user.id));
        } else {
            setUsersId([]);
        }
    }

    return (
        <div className="d-flex flex-column gap-2">
            <div className="d-flex rounded template-theme p-4">
                <div className="w-100">
                    <Input
                        onClick={toggleAll}
                        type="checkbox"
                        checked={users.every(user => usersId.includes(user.id))}
                    />
                </div>
                <div className="w-100">{t("firstname")}</div>
                <div className="w-100">{t("lastname")}</div>
                <div className="w-100">{t("email")}</div>
                <div className="w-100">{t("status")}</div>
                <div className="w-100">{t("role")}</div>
            </div>
            {
                users?.map(user => (
                    <div key={user?.id} className="d-flex rounded template-theme p-4">
                        <div className="w-100">
                            <Input
                                type="checkbox"
                                onChange={() => handleSelect(user?.id)}
                                checked={usersId.includes(user.id)}
                            />
                        </div>
                        <div className="w-100">{user?.firstname}</div>
                        <div className="w-100">{user?.lastname}</div>
                        <div className="w-100">{user?.email}</div>
                        <div className="w-100">
                            <Status isActive={user.isActive} />
                        </div>
                        <div className="w-100">
                            <Role isAdmin={user.isAdmin} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
