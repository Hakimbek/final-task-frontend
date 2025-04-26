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
            {
                isSubmitting
                    ? <Spinner style={{ height: "24px", width: "24px" }} size="sm" color="black" type="grow"/>
                    : text
            }
        </Button>
    )
}
