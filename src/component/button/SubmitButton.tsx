import { Button, Spinner } from "reactstrap";

interface SubmitButtonProps {
    isDisabled: boolean;
    isSubmitting: boolean;
    text: string;
}

export const SubmitButton = ({ isDisabled, isSubmitting, text }: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            className="mt-2 d-flex align-items-center gap-2 justify-content-center"
            disabled={isDisabled}
            color="warning"
        >
            {text}
            <Spinner
                size="sm"
                color="black"
                type="grow"
                className={`position-absolute ${isSubmitting ? "visible" : "invisible"}`}
                style={{ margin: "0 0 0 80px" }}
            />
        </Button>
    )
}
