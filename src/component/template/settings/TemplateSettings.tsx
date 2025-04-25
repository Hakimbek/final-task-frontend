import { CreateQuestionButton } from "../button/CreateQuestionButton.tsx";
import { EditTemplateButton } from "../button/EditTemplateButton.tsx";
import { DeleteTemplateButton } from "../button/DeleteTemplateButton.tsx";
import { useTranslation } from "react-i18next";
import { ResponseButton } from "../button/ResponseButton.tsx";

interface TemplateSettingsProps {
    isOwner: boolean;
    firstname: string | undefined;
    lastname: string | undefined;
    isAdmin: boolean | undefined;
}

export const TemplateSettings = ({ isOwner, firstname, lastname, isAdmin }: TemplateSettingsProps) => {
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
