import { CreateQuestionButton } from "../button/CreateQuestionButton.tsx";
import { EditTemplateButton } from "../button/EditTemplateButton.tsx";
import { DeleteTemplateButton } from "../button/DeleteTemplateButton.tsx";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hook/hooks.ts";
import { selectUserId } from "../../../app/slice/authSlice.ts";
import { ResponseButton } from "../button/ResponseButton.tsx";

interface TemplateSettingsProps {
    templateUserId: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    isAdmin: boolean | undefined;
}

export const TemplateSettings = ({ templateUserId, firstname, lastname, isAdmin }: TemplateSettingsProps) => {
    const userId = useAppSelector(selectUserId);
    const isOwner = userId === templateUserId;
    const { t } = useTranslation();

    return (
        <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="fs-3">
                {t("template")} | {firstname} {lastname}
            </div>
            <div className="d-flex gap-2">
                {
                    (isAdmin || isOwner) && (
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
