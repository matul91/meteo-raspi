import * as React from "react";
import { Col, Container, Row } from "reactstrap";
import PressureStatus from "../footer/PressureStatus";
import TemperatureStatus from "../footer/TemperatureStatus";
import WindStatus from "../footer/WindStatus";

class Footer extends React.PureComponent {
    public render(): JSX.Element {
        return (
            <Container fluid={true} className="mx-0 px-0">
                <Row className="mx-0 px-0">
                    {this.renderCol(<TemperatureStatus/>, "temperature-status")}
                    {this.renderCol(<WindStatus/>, "wind-status")}
                    {this.renderCol(<PressureStatus/>, "pressure-status")}
                </Row>
            </Container>
        );
    }

    private renderCol(children: JSX.Element, className: string): JSX.Element {
        return (
            <Col md={4} className={`${className} px-0 mx-0`}>
                <Row className="text-center no-gutters">
                    {children}
                </Row>
            </Col>
        );
    }
}

export default Footer;
