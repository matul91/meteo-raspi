import Alert from "components/statusAlerts/StatusAlert";
import * as React from "react";

interface Props {
    text: string;
}

const WarningAlert: React.SFC<Props> = (props) => {
    return (
        <Alert type="warning" icon="warning" text={props.text} />
    );
};

export default WarningAlert;
