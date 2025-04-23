import { MakeAdminButton } from "../button/MakeAdminButton.tsx";
import { MakeUserButton } from "../button/MakeUserButton.tsx";
import { ActivateUsersButton } from "../button/ActivateUsersButton.tsx";
import { DeactivateUsersButton } from "../button/DeactivateUsersButton.tsx";
import { DeleteUsersButton } from "../button/DeleteUsersButton.tsx";

interface SettingsProps {
    isDisabled: boolean;
    users: string[];
    setUsers: (users: string[]) => void;
}

export const Settings = ({ isDisabled, users, setUsers }: SettingsProps) => {
    return (
        <div className="d-flex justify-content-end mb-3 gap-2">
            <MakeAdminButton isDisabled={isDisabled} userIds={users} setUsers={setUsers} />
            <MakeUserButton isDisabled={isDisabled} userIds={users} setUsers={setUsers} />
            <ActivateUsersButton isDisabled={isDisabled} userIds={users} setUsers={setUsers} />
            <DeactivateUsersButton isDisabled={isDisabled} userIds={users} setUsers={setUsers} />
            <DeleteUsersButton isDisabled={isDisabled} userIds={users} setUsers={setUsers} />
        </div>
    )
}