import { useNavigate } from "react-router-dom";
import { useGetTemplatesQuery } from "../../../app/api/templateApi.ts";
import { useAppSelector } from "../../../app/hook/hooks.ts";
import { selectSearch } from "../../../app/slice/searchSlice.ts";
import { Spinner } from "../../spinner/Spinner.tsx";

export const TemplateItems = () => {
    const search = useAppSelector(selectSearch);
    const navigate = useNavigate();
    const { data, isLoading } = useGetTemplatesQuery(search);

    if (isLoading) return <Spinner />;

    return (
        <>
            {data?.map(({ title, id, user }) => (
                <div key={id} className="d-flex cursor-pointer" onClick={() => navigate(`/template/${id}`)}>
                    <div className="p-4 bg-warning rounded-start d-flex align-items-center">
                        <i className="bi bi-journal-text"></i>
                    </div>
                    <div className="d-flex justify-content-between align-items-center template-theme w-100 p-4 rounded-end text-theme">
                        <div>{title} | {user?.firstname} {user?.lastname}</div>
                    </div>
                </div>
            ))}
        </>
    )
}