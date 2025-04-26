import { Spinner } from "reactstrap";

export const OverlaySpinner = () => {
    return (
        <div
            className="position-absolute top-0 bottom-0 start-0 end-0 z-2 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
        >
            <Spinner color="warning" type="grow"/>
        </div>
    )
}
