import { CreateQuestionButton } from "../button/CreateQuestionButton.tsx";
import { EditTemplateButton } from "../button/EditTemplateButton.tsx";
import { DeleteTemplateButton } from "../button/DeleteTemplateButton.tsx";
import { useTranslation } from "react-i18next";
import { ResponsesButton } from "../button/ResponsesButton.tsx";
import { FillOutButton } from "../button/FillOutButton.tsx";
import { useAuth } from "../../../app/hook/useAuth.ts";
import { useGetResponsesByUserAndTemplateIdQuery } from "../../../app/api/responseApi.ts";
import { useParams } from "react-router-dom";
import { ResponseButton } from "../button/ResponseButton.tsx";
import { Spinner } from "reactstrap";

interface TemplateSettingsProps {
    isOwner: boolean;
}

export const TemplateSettings = ({ isOwner }: TemplateSettingsProps) => {
    const { t } = useTranslation();
    const { user, isLoading: isUserLoading } = useAuth();
    const { templateId = '' } = useParams();
    const { data, isLoading } = useGetResponsesByUserAndTemplateIdQuery({ userId: user?.id || '', templateId });

    return (
        <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="fs-3">
                {t("template")} | {user?.firstname} {user?.lastname}
            </div>
            <div className="d-flex gap-2">
                {
                    isUserLoading || isLoading
                        ? <Spinner color="warning" size="sm" type="grow" />
                        : (
                            <>
                                {!isOwner && user && data && <ResponseButton responseId={data.id} />}
                                {!isOwner && user && !data && <FillOutButton />}
                                {
                                    (user?.isAdmin || isOwner) && (
                                        <>
                                            <ResponsesButton />
                                            <CreateQuestionButton />
                                            <EditTemplateButton />
                                            <DeleteTemplateButton />
                                        </>
                                    )
                                }
                            </>
                        )
                }
            </div>
        </div>
    )
}
