import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAnswerByResponseAndQuestionIdQuery } from "../../../app/api/answerApi.ts";

interface TextInputProps {
    questionId: string;
}

export const Text = ({ questionId }: TextInputProps) => {
    const text = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false)
    const { responseId } = useParams();
    const { data } = useGetAnswerByResponseAndQuestionIdQuery({ questionId, responseId }, { skip: !responseId });

    const handleChange = () => {
        const value = text.current?.value || "";

        if (value.trim() === "") {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    return (
        <input
            ref={text}
            required
            type="text"
            defaultValue={data?.value || ''}
            name={questionId}
            className={`input-theme w-100 ${isError && "border border-danger"}`}
            onChange={handleChange}
            onBlur={handleChange}
        />
    )
}
