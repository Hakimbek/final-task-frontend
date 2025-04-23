import { useGetAllUsersQuery } from "../../app/api/userApi.ts";
import { Spinner, Input } from "reactstrap";
import { ChangeEvent, useState } from "react";
import { Status } from "./status/Status.tsx";
import { Settings } from "./settings/Settings.tsx";

export const Admin = () => {
    const { data, isLoading } = useGetAllUsersQuery();
    const [users, setUsers] = useState<string[]>([]);
    const isDisabled = users.length === 0;

    const handleChange = (userId: string) => {
        if (!users.includes(userId)) {
            setUsers(prevState => [...prevState, userId]);
        } else {
            setUsers(prevState => prevState.filter(id => id !== userId));
        }
    }

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <div className="text-theme d-flex flex-column gap-2 p-5">
            <Settings isDisabled={isDisabled} users={users} setUsers={setUsers} />
            {
                data?.map(user => (
                    <div key={user?.id} className="rounded template-theme p-4 d-flex align-items-center gap-5">
                        <Input
                            type="checkbox"
                            onChange={() => handleChange(user?.id)}
                            checked={users.includes(user.id)}
                        />
                        <div>
                            {user?.firstname} {user?.lastname} | {user?.email}
                        </div>
                        <Status isActive={user?.isActive} isAdmin={user?.isAdmin} />
                    </div>
                ))
            }
        </div>
    )
}