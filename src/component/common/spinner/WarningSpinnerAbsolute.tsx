import { Spinner } from "reactstrap";

const WarningSpinnerAbsolute = () => {
    return (
        <div className="position-absolute d-flex align-items-center justify-content-center top-0 bottom-0 start-0 end-0">
            <Spinner color="warning" type="grow"/>
        </div>
    )
}

export default WarningSpinnerAbsolute;