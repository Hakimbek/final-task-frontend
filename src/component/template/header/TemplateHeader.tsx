import { QuestionWrapper } from "../../question/wrapper/QuestionWrapper.tsx";
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
            <QuestionWrapper name={t("title")}>
                <div className="fs-3">{title}</div>
            </QuestionWrapper>
            <QuestionWrapper name={t("topic")}>
                <div>{topic}</div>
            </QuestionWrapper>
            <QuestionWrapper name={t("description")}>
                <ReactMarkdown>{description}</ReactMarkdown>
            </QuestionWrapper>
        </>
    )
}

export default TemplateHeader;