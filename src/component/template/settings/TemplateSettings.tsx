import { Spinner } from "reactstrap";
import { useAuth } from "../../../app/hook/useAuth.ts";
import { CreateQuestionButton } from "../button/CreateQuestionButton.tsx";
import { EditTemplateButton } from "../button/EditTemplateButton.tsx";
import { DeleteTemplateButton } from "../button/DeleteTemplateButton.tsx";

interface TemplateSettingsProps {
    templateUserId: string | undefined;
}

export const TemplateSettings = ({ templateUserId }: TemplateSettingsProps) => {
    const { isLoading, user } = useAuth();
    const isOwner = user?.id === templateUserId;

    if (isLoading) return (
        <div className="d-flex w-100 justify-content-end gap-2">
            <Spinner size="sm" color="warning" type="grow" />
        </div>
    )

    return (
        <div className="d-flex w-100 justify-content-end gap-2">
            {
                (user?.isAdmin || isOwner) && (
                    <>
                        <CreateQuestionButton />
                        <EditTemplateButton />
                        <DeleteTemplateButton />
                    </>
                )
            }
        </div>
    )
}
