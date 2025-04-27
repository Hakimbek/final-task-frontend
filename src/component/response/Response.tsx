import { useGetResponsesByIdQuery } from "../../app/api/responseApi.ts";
import { useParams } from "react-router-dom";
import { Spinner } from "../spinner/Spinner.tsx";
import { TemplateHeader } from "../template/header/TemplateHeader.tsx";
import { InfoWrapper } from "../wrapper/InfoWrapper.tsx";
import { useTranslation } from "react-i18next";

export const Response = () => {
    const { responseId = '' } = useParams();
    const { data, isLoading } = useGetResponsesByIdQuery(responseId);
    const { t } = useTranslation();

    if (isLoading) return <Spinner />;

    return (
        <div className="text-theme d-flex flex-column align-items-center p-4 gap-4 mt-4">
            <div style={{ width: 400 }} className="d-flex flex-column gap-4">
                <TemplateHeader
                    title={data?.template?.title}
                    description={data?.template?.description}
                    topic={data?.template?.topic}
                />
                {
                    data?.answers?.map((answer) => (
                        <InfoWrapper name={t("response")}>
                            <div>{answer.question.title}</div>
                            <div>{answer.value}</div>
                        </InfoWrapper>
                    ))
                }
            </div>
        </div>
    )
}
