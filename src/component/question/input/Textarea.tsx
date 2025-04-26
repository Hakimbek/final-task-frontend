import { useRef, useState } from "react";

interface TextareaInputProps {
    questionId: string;
}

export const Textarea = ({ questionId }: TextareaInputProps) => {
    const textarea = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false)

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
            className={`input-theme w-100 ${isError && "border border-danger"}`}
            onChange={handleChange}
            onBlur={handleChange}
        />
    )
}
