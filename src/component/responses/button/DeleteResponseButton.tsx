import { useDeleteResponseByIdMutation } from "../../../app/api/responseApi.ts";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";

interface DeleteResponseButtonProps {
    responseId: string;
}

export const DeleteResponseButton = ({ responseId = '' }: DeleteResponseButtonProps) => {
    const [deleteResponse, { isLoading }] = useDeleteResponseByIdMutation();

    const handleDelete = () => {
        deleteResponse(responseId)
            .unwrap()
            .then(result => toast(result.message))
            .catch(result => toast(result.data.message));
    }

    return (
        <button disabled={isLoading} onClick={handleDelete} className="button-theme">
            {
                isLoading ? <Spinner size="sm" color="warning" type="grow"/> : <i className="bi bi-trash3"></i>
            }
        </button>
    )
}