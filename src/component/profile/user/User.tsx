import { useAuth } from "../../../app/hook/useAuth.ts";
import { Spinner } from "../../spinner/Spinner.tsx";
import { useTranslation } from "react-i18next";
import ImageUploader from "../../upload/ImageUploader.tsx";
import { QuestionWrapper } from "../../question/wrapper/QuestionWrapper.tsx";
import { EditUserButton } from "./buttons/EditUserButton.tsx";
import { DeleteUserButton } from "./buttons/DeleteUserButton.tsx";
import { UserImage } from "./image/UserImage.tsx";

export const User = () => {
    const { isLoading, user } = useAuth();
    const { t } = useTranslation();

    if (isLoading) return <Spinner />;

    return (
        <div>
            <div className="fs-4 d-flex justify-content-end px-5 align-items-center gap-2">
                <ImageUploader />
                <EditUserButton />
                <DeleteUserButton userId={user?.id || ''} />
            </div>
            <div className="d-flex flex-column align-items-center mt-3 text-theme gap-4">
                <UserImage imageUrl={user?.image} />
                <QuestionWrapper name={t("firstname")}>
                    <div style={{width: "300px"}}>{user?.firstname}</div>
                </QuestionWrapper>
                <QuestionWrapper name={t("lastname")}>
                    <div style={{width: "300px"}}>{user?.lastname}</div>
                </QuestionWrapper>
                <QuestionWrapper name={t("email")}>
                    <div style={{width: "300px"}}>{user?.email}</div>
                </QuestionWrapper>
                <QuestionWrapper name={t("role")}>
                    <div style={{width: "300px"}}>{user?.isAdmin ? t("admin") : t("user")}</div>
                </QuestionWrapper>
            </div>
        </div>
    )
}
