import { useRef, useState } from "react";
import {useParams} from "react-router-dom";
import { useGetAnswerByResponseAndQuestionIdQuery } from "../../../app/api/answerApi.ts";

interface NumberInputProps {
    questionId: string;
}

export const Number = ({ questionId }: NumberInputProps) => {
    const number = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false)
    const { responseId } = useParams();
    const { data } = useGetAnswerByResponseAndQuestionIdQuery({ questionId, responseId }, { skip: !responseId });

    const handleChange = () => {
        const value = number.current?.value || "";

        if (value.trim() === "" || +value < 0) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    return (
        <input
            ref={number}
            required
            type="number"
            defaultValue={data?.value || ''}
            min={0}
            name={questionId}
            className={`input-theme w-100 ${isError && "border border-danger"}`}
            onChange={handleChange}
            onBlur={handleChange}
        />
    )
}
