import { useParams } from "react-router-dom";
import TemplateHeader from "./header/TemplateHeader.tsx";
import { TemplateSettings } from "./settings/TemplateSettings.tsx";
import { SortableQuestionList } from "../drag/SortableQuestionList.tsx";
import { useGetTemplateByIdQuery } from "../../app/api/templateApi.ts";
import { Spinner } from "../spinner/Spinner.tsx";
import { useAuth } from "../../app/hook/useAuth.ts";

export const Template = () => {
    const { user, isLoading } = useAuth();
    const { templateId = '' } = useParams();
    const { data: template, isLoading: isTemplateLoading } = useGetTemplateByIdQuery(templateId);
    const isOwner = user?.id === template?.user?.id;

    if (isTemplateLoading || isLoading) return <Spinner />;

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4">
           <TemplateSettings
               isOwner={isOwner}
               firstname={template?.user?.firstname}
               lastname={template?.user?.lastname}
               isAdmin={user?.isAdmin}
           />
            <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                <TemplateHeader
                    title={template?.title}
                    description={template?.description}
                    topic={template?.topic}
                />
                <SortableQuestionList
                    key={template?.questions.length}
                    initialQuestions={template?.questions || []}
                    templateUserId={template?.user?.id || ''}
                />
            </div>
        </div>
    )
}
