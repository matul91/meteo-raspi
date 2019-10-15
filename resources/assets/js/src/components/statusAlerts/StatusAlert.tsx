import Icon from "components/svgIcon/SvgIcon";
import * as React from "react";
import { Alert } from "reactstrap";

interface Props {
    type: "success" | "warning" | "danger";
    icon: "information" | "warning" | "cross-circle";
    text: string;
}

const StatusAlert: React.SFC<Props> = (props) => {
    return (
        <React.Fragment>
            <Alert color={props.type} className="float-right pr-4">
                <Icon kind={props.icon} size={25} />
                <span className="pl-2 align-middle">
                    {props.text}
                </span>
            </Alert>
        </React.Fragment>
    );
};

export default StatusAlert;
