import Alert from "components/statusAlerts/StatusAlert";
import * as React from "react";

interface Props {
    text: string;
}
const SuccessAlert: React.SFC<Props> = (props) => {
    return (
        <Alert type="success" icon="information" text={props.text} />
    );
};

export default SuccessAlert;
