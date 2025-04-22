import { useAuth } from "../../../app/hook/useAuth.ts";
import { Button, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import ImageUploader from "../../upload/ImageUploader.tsx";
import { QuestionWrapper } from "../../question/wrapper/QuestionWrapper.tsx";
import { useNavigate } from "react-router-dom";

export const User = () => {
    const { isLoading, user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
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
                <ImageUploader />
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
            <Button
                color="warning"
                style={{width: "320px"}}
                onClick={() => navigate(`/user/edit`)}
            >
                {t("edit")}
            </Button>
        </div>
    )
}