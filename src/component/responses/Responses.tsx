import { useParams } from "react-router-dom";
import { useGetResponsesByTemplateIdQuery } from "../../app/api/responseApi.ts";
import { useTranslation } from "react-i18next";
import { Spinner } from "reactstrap";
import { DeleteResponseButton } from "./button/DeleteResponseButton.tsx";
import { OpenResponseButton } from "./button/OpenResponseButton.tsx";

export const Responses = () => {
    const { templateId = '' } = useParams();
    const { data, isLoading } = useGetResponsesByTemplateIdQuery(templateId);
    const { t } = useTranslation();

    if (isLoading) return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    );

    return (
        <div className="d-flex flex-column text-theme p-5 gap-4">
            <div className="fs-3 d-flex justify-content-start">{t("responses")}</div>
            <div className="d-flex flex-column gap-2">
                {
                    data?.map(response => (
                        <div key={response.id} className="p-3 rounded d-flex justify-content-between align-items-center template-theme">
                            <div>{response.user.firstname} {response.user.lastname}</div>
                            <div>
                                <OpenResponseButton templateId={templateId} userId={response.user.id} />
                                <DeleteResponseButton responseId={response.id} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}