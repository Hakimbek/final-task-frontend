import { useAuth } from "../../../app/hook/useAuth.ts";
import { Button, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import ImageUploader from "../../upload/ImageUploader.tsx";
import { QuestionWrapper } from "../../question/wrapper/QuestionWrapper.tsx";
import { useNavigate } from "react-router-dom";
import { useDeleteUserByIdMutation } from "../../../app/api/userApi.ts";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hook/hooks.ts";
import { logout } from "../../../app/slice/authSlice.ts";

export const User = () => {
    const { isLoading, user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ deleteUserById, { isLoading: isDeleting } ] = useDeleteUserByIdMutation();
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        deleteUserById(user?.id || '')
            .unwrap()
            .then(() => {
                dispatch(logout());
                navigate("/login");
            })
            .catch(response => toast(response.data.message));
    }

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <div>
            <div className="fs-4 d-flex justify-content-end px-5 align-items-center gap-2">
                <ImageUploader />
                <div>
                    <Button
                        color="warning"
                        onClick={() => navigate(`/user/edit`)}
                    >
                        <i className="bi bi-gear"></i>
                    </Button>
                </div>
                <div>
                    <Button
                        disabled={isDeleting}
                        color="warning"
                        onClick={handleDelete}
                    >
                        <i className="bi bi-trash3"></i>
                    </Button>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center mt-3 text-theme gap-4">
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    {
                        user?.image ? (
                            <img src={user?.image} alt="User image" width={100} height={100} className="rounded-circle" />
                        ) : (
                            <div
                                style={{width: "100px", height: "100px"}}
                                className="rounded-circle template-theme d-flex justify-content-center align-items-center">
                                <i className="bi bi-person"></i>
                            </div>
                        )
                    }
                </div>
                <QuestionWrapper name={t("firstname")}>
                    <div style={{width: "300px"}}>{user?.firstname}</div>
                </QuestionWrapper>
                <QuestionWrapper name={t("lastname")}>
                    <div style={{width: "300px"}}>{user?.lastname}</div>
                </QuestionWrapper>
                <QuestionWrapper name={t("email")}>
                    <div style={{width: "300px"}}>{user?.email}</div>
                </QuestionWrapper>
            </div>
        </div>
    )
}