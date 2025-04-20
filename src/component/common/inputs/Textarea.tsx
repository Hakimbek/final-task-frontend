import { Label } from "reactstrap";
import * as React from "react";
import { useId, useState } from "react";

interface TextareaProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    rules: string;
    error: string;
}

const Textarea = ({
    label,
    placeholder,
    value,
    onChange,
    rules,
    error
}: TextareaProps) => {
    const [isInputValid, setIsInputValid] = useState(true);
    const id = useId();
    const pattern = new RegExp(rules);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
        setIsInputValid(pattern.test(e.target.value));
    }

    return (
        <div className="d-flex flex-column">
            <Label htmlFor={id}>{label}</Label>
            <textarea
                rows={5}
                id={id}
                placeholder={placeholder}
                className="input-theme"
                value={value}
                onChange={handleInputChange}
                onBlur={(e) => setIsInputValid(pattern.test(e.target.value))}
            ></textarea>
            <small className={`text-danger ${isInputValid ? 'invisible' : 'visible'}`}>
                {error}
            </small>
        </div>
    )
}

export default Textarea;