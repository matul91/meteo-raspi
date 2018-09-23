import * as React from "react";
import { PulseLoader } from "react-spinners";
import { Col, Container, Fade, Row } from "reactstrap";

interface Props {
    color?: string;
    size?: number;
}

export default class LoadingOverview extends React.Component<Props> {

    private static defaultProps = {
        color: "#858585",
        size: 10,
    };

    public render(): JSX.Element {
        const loader = (
            <PulseLoader size={this.props.size} color={this.props.color} className={"d-inline text-normal"}/>
        );

        return (
            <React.Fragment>
                <Col xs={6} xl={6} className="separator py-4">
                    {loader}
                </Col>

                <Col xs={6} xl={3} className="separator py-4">
                    {loader}
                </Col>

                <Col xl={3} className=" separator py-4 d-none d-xl-block">
                    {loader}
                </Col>
            </React.Fragment>
        );
    }
}
