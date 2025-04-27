import { CreateQuestionButton } from "../button/CreateQuestionButton.tsx";
import { EditTemplateButton } from "../button/EditTemplateButton.tsx";
import { DeleteTemplateButton } from "../button/DeleteTemplateButton.tsx";
import { useTranslation } from "react-i18next";
import { ResponseButton } from "../button/ResponseButton.tsx";
import { FillOutButton } from "../button/FillOutButton.tsx";
import { useAuth } from "../../../app/hook/useAuth.ts";

interface TemplateSettingsProps {
    isOwner: boolean;
}

export const TemplateSettings = ({ isOwner }: TemplateSettingsProps) => {
    const { t } = useTranslation();
    const { user } = useAuth();

    return (
        <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="fs-3">
                {t("template")} | {user?.firstname} {user?.lastname}
            </div>
            <div className="d-flex gap-2">
                {!isOwner && user && <FillOutButton />}
                {
                    (user?.isAdmin || isOwner) && (
                        <>
                            <ResponseButton />
                            <CreateQuestionButton />
                            <EditTemplateButton />
                            <DeleteTemplateButton />
                        </>
                    )
                }
            </div>
        </div>
    )
}
