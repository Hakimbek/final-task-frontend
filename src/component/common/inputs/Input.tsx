import { Label } from "reactstrap";
import { useId } from "react";
import * as React from "react";
import { useState } from "react";

interface InputProps {
    label: string;
    placeholder: string;
    type: "text" | "email";
    value: string;
    onChange: (value: string) => void;
    rules: string;
    error: string;
}

const Input = ({
    label,
    placeholder,
    type,
    value,
    onChange,
    rules,
    error
}: InputProps) => {
    const [isInputValid, setIsInputValid] = useState(true);
    const id = useId();
    const pattern = new RegExp(rules);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setIsInputValid(pattern.test(e.target.value));
    }

    return (
        <div className="d-flex flex-column">
            <Label htmlFor={id}>{label}</Label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="input-theme"
                value={value}
                onChange={handleInputChange}
                onBlur={(e) => setIsInputValid(pattern.test(e.target.value))}
            />
            <small className={`text-danger ${isInputValid ? 'invisible' : 'visible'}`}>
                {error}
            </small>
        </div>
    )
}

export default Input;