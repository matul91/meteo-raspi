import Icon from "components/svgIcon/SvgIcon";
import * as React from "react";
import { Alert } from "reactstrap";

const StatusAlerts = () => {
    return (
        <React.Fragment>
            <Alert color="success" className="float-right pr-4">
                <Icon kind="information" size={25} />
                <span className="pl-2 align-middle">
                    Perfektní počasí k létání, jupíí!
                </span>
            </Alert>
            <Alert color="warning" className="float-right pr-4">
                <Icon kind="warning" size={25} />
                <span className={"pl-2 align-middle"}>
                A do prdele, dneska je to spíše na trenažér.
                </span>
            </Alert>
            <Alert color="danger" className="float-right pr-4 ">
                <Icon kind="cross-circle" size={25}  />
                <span className="pl-2 align-middle">
                    Došlo k chybě. Prosím zkuste to později.
                </span>
            </Alert>
        </React.Fragment>
    );
};

export default StatusAlerts;
