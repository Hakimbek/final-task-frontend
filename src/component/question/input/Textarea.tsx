import { useRef, useState } from "react";
import {useParams} from "react-router-dom";
import { useGetAnswerByResponseAndQuestionIdQuery } from "../../../app/api/answerApi.ts";

interface TextareaInputProps {
    questionId: string;
}

export const Textarea = ({ questionId }: TextareaInputProps) => {
    const textarea = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false)
    const { responseId } = useParams();
    const { data } = useGetAnswerByResponseAndQuestionIdQuery({ questionId, responseId }, { skip: !responseId });

    const handleChange = () => {
        const value = textarea.current?.value || "";

        if (value.trim() === "") {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    return (
        <textarea
            required
            name={questionId}
            defaultValue={data?.value || ''}
            className={`input-theme w-100 ${isError && "border border-danger"}`}
            onChange={handleChange}
            onBlur={handleChange}
        />
    )
}
