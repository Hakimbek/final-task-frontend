import { Label } from "reactstrap";
import { useId, useState } from "react";
import * as React from "react";

interface PasswordProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    rules: string;
    error: string;
}

const Password = ({
    label,
    placeholder,
    value,
    onChange,
    rules,
    error
}: PasswordProps) => {
    const [isInputValid, setIsInputValid] = useState(true);
    const [visible, setVisible] = useState(false);
    const id = useId();
    const pattern = new RegExp(rules);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setIsInputValid(pattern.test(e.target.value));
    }

    return (
        <div className="d-flex flex-column">
            <Label htmlFor={id}>{label}</Label>
            <div className="d-flex align-items-center input-theme border-0 rounded p-0">
                <input
                    type={visible ? "text" : "password"}
                    id={id}
                    placeholder={placeholder}
                    className="input-theme w-100"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={(e) => setIsInputValid(pattern.test(e.target.value))}
                />
                <button type="button" onClick={() => setVisible(!visible)} className="button-theme">
                    <i className={`bi ${visible ? "bi-eye" : "bi-eye-slash"}`}></i>
                </button>
            </div>
            <small className={`text-danger ${isInputValid ? 'invisible' : 'visible'}`}>
                {error}
            </small>
        </div>
    )
}

export default Password;