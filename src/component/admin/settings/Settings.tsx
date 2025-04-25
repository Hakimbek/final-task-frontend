import { MakeAdminButton } from "../buttons/MakeAdminButton.tsx";
import { MakeUserButton } from "../buttons/MakeUserButton.tsx";
import { ActivateUsersButton } from "../buttons/ActivateUsersButton.tsx";
import { DeactivateUsersButton } from "../buttons/DeactivateUsersButton.tsx";
import { DeleteUsersButton } from "../buttons/DeleteUsersButton.tsx";

interface SettingsProps {
    usersId: string[];
    setUsersId: (users: string[]) => void;
}

export const Settings = ({ usersId, setUsersId }: SettingsProps) => {
    return (
        <div className="d-flex justify-content-end mb-3 gap-2">
            <MakeAdminButton userIds={usersId} setUsers={setUsersId} />
            <MakeUserButton userIds={usersId} setUsers={setUsersId} />
            <ActivateUsersButton userIds={usersId} setUsers={setUsersId} />
            <DeactivateUsersButton userIds={usersId} setUsers={setUsersId} />
            <DeleteUsersButton userIds={usersId} setUsers={setUsersId} />
        </div>
    )
}