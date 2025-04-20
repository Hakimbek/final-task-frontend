import * as React from "react";

interface QuestionWrapperProps {
    name: string;
    children?: React.ReactNode;
}

export const QuestionWrapper = ({ children, name }: QuestionWrapperProps) => {
    return (
        <div className="border border-warning p-2 position-relative rounded">
            <span className="position-absolute text-warning px-2 question-title" style={{ top: '-14px', right: '14px' }}>
                {name}
            </span>
            {children}
        </div>
    )
}
