import { useRef, useState } from "react";

interface TextInputProps {
    questionId: string;
}

export const Text = ({ questionId }: TextInputProps) => {
    const text = useRef<HTMLInputElement>(null);
    const [isError, setIsError] = useState(false)

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
            name={questionId}
            className={`input-theme w-100 ${isError && "border border-danger"}`}
            onChange={handleChange}
            onBlur={handleChange}
        />
    )
}
