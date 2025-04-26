import { InfoWrapper } from "../wrapper/InfoWrapper.tsx";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../app/hook/useAuth.ts";
import { QuestionSettings } from "./settings/QuestionSettings.tsx";
import { Text } from "./input/Text.tsx";
import { Textarea } from "./input/Textarea.tsx";
import { Number } from "./input/Number.tsx";
import "./Question.css";

interface QuestionProps {
    id: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    templateUserId: string | undefined;
}

export const Question = ({
    id,
    title,
    description,
    isVisible,
    type,
    templateUserId,
}: QuestionProps) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const isOwner = user?.id === templateUserId;

    if (!isVisible && !isOwner && !user?.isAdmin) return null;

    return (
        <div className="question cursor-pointer">
            <InfoWrapper name={t("question")}>
                <div className="d-flex flex-column gap-2 cursor-pointer">
                    <div>{title}</div>
                    <div>{description}</div>
                    {type === "Text" && <Text questionId={id} />}
                    {type === "Textarea" && <Textarea questionId={id} />}
                    {type === "Number" && <Number questionId={id} />}
                </div>
                {(user?.isAdmin || isOwner) && <QuestionSettings id={id} />}
            </InfoWrapper>
        </div>
    )
}
