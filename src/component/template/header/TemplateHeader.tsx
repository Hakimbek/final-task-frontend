import { InfoWrapper } from "../../wrapper/InfoWrapper.tsx";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

interface TemplateHeaderProps {
    title: string | undefined;
    description: string | undefined;
    topic: string | undefined;
}

const TemplateHeader = ({ title, topic, description }: TemplateHeaderProps) => {
    const { t } = useTranslation();

    return (
        <>
            <InfoWrapper name={t("title")}>
                <div className="fs-3">{title}</div>
            </InfoWrapper>
            <InfoWrapper name={t("topic")}>
                <div>{topic}</div>
            </InfoWrapper>
            <InfoWrapper name={t("description")}>
                <ReactMarkdown>{description}</ReactMarkdown>
            </InfoWrapper>
        </>
    )
}

export default TemplateHeader;