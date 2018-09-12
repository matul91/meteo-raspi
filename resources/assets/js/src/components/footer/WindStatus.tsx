import * as React from "react";
import { Col, Container, Row } from "reactstrap";

export default class WindStatus extends React.PureComponent {
    public render(): JSX.Element {
        return (
            <React.Fragment>
                <Col xs="6" className="wind-main text-normal wind-strong separator py-4">
                    30 <span className="text-smaller">m/s</span>
                </Col>
                <Col xs={3} xl={2} className=" text-smaller wind-strong separator py-4">
                    <span className="time">9:00</span>
                    8 <span className="text-mini">m/s</span>
                </Col>
                <Col xs={3} xl={2} className=" text-smaller wind-mild separator py-4">
                    <span className="time">9:00</span>
                    8.4 <span className="text-mini">m/s</span>
                </Col>
                <Col xl={2} className=" text-smaller wind-none separator py-4 d-none d-xl-block">
                    <span className="time">9:00</span>
                    0 <span className="text-mini">m/s</span>
                </Col>
            </React.Fragment>
        );
    }
}
