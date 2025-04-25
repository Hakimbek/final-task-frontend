import { useGetAllUsersQuery } from "../../app/api/userApi.ts";
import { useState } from "react";
import { Settings } from "./settings/Settings.tsx";
import { Spinner } from "../spinner/Spinner.tsx";
import { Table } from "./table/Table.tsx";

export const Admin = () => {
    const { data = [], isLoading } = useGetAllUsersQuery();
    const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]);

    if (isLoading) return <Spinner />;

    return (
        <div className="text-theme d-flex flex-column gap-2 p-5">
            <Settings usersId={selectedUsersId} setUsersId={setSelectedUsersId} />
            <Table users={data} usersId={selectedUsersId} setUsersId={setSelectedUsersId} />
        </div>
    )
}