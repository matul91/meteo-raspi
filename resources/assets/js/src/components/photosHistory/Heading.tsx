import Icon from "components/svgIcon/SvgIcon";
import * as React from "react";
import {PulseLoader} from "react-spinners";
import { Alert, Col, Row } from "reactstrap";

interface Props {
    isLoading: boolean;
}

export class Heading extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { isLoading } = this.props;
        const historyIcon = (<Icon kind="history" />);
        return (
            <Alert color="primary">
                <div className="d-flex">
                    <div className="p-2">
                        <span className="text-uppercase">Poslední <br/> snímky</span>
                    </div>
                    <div className="p-2 ml-auto align-self-center" >
                        {(isLoading) ? <PulseLoader size={10} color="#ffffff" className={"d-inline"}/> : historyIcon}
                    </div>
                </div>
            </Alert>
        );
    }
}
