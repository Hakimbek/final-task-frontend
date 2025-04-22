import { useNavigate } from "react-router-dom";
import { useGetTemplatesQuery } from "../../../app/api/templateApi.ts";
import { useAppSelector } from "../../../app/hook/hooks.ts";
import { selectSearch } from "../../../app/slice/searchSlice.ts";
import { Spinner } from "reactstrap";
import { selectUserId } from "../../../app/slice/authSlice.ts";

export const TemplatesItems = () => {
    const search = useAppSelector(selectSearch);
    const navigate = useNavigate();
    const { data, isLoading } = useGetTemplatesQuery(search);
    const userId = useAppSelector(selectUserId) || '';

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <>
            {data?.map(({ title, id, user }) => (
                <div key={id} className="d-flex cursor-pointer" onClick={() => navigate(`/user/${userId}/template/${id}`)}>
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