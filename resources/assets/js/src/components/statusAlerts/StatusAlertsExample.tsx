import Icon from "components/svgIcon/SvgIcon";
import * as React from "react";
import { Alert } from "reactstrap";

const StatusAlertsExample = () => {
    return (
        <React.Fragment>
            <Alert color="warning" className="float-right pr-4">
                <Icon kind="warning" size={25} />
                <span className={"pl-2 align-middle"}>
                    Nízka hodnota napětí: 9.8 V
                </span>
            </Alert>
        </React.Fragment>
    );
};

export default StatusAlertsExample;
