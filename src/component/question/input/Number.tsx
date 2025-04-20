import { useRef, useState } from "react";

interface NumberInputProps {
    answer: string;
    questionId: string;
}

export const Number = ({ questionId, answer }: NumberInputProps) => {
    const number = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false)

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
            defaultValue={answer}
            required
            type="number"
            min={0}
            name={questionId}
            className={`input-theme w-100 ${isError && "border border-danger"}`}
            onChange={handleChange}
            onBlur={handleChange}
        />
    )
}