import { Spinner as ReactstrapSpinner } from "reactstrap";

export const Spinner = () => {
    return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <ReactstrapSpinner color="warning" type="grow"/>
        </div>
    )
}