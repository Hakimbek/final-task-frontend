import * as React from "react";

interface FormProps {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
    return (
        <form
            style={{ width: "350px" }}
            className="d-flex flex-column mx-auto mt-5 text-theme"
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
}

export default Form;
