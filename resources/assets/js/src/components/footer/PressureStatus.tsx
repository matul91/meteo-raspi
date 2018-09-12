import * as React from "react";
import { Col, Container, Row } from "reactstrap";

export default class PressureStatus extends React.PureComponent {
    public render(): JSX.Element {
        return (
            <React.Fragment>
                <Col xs={6} xl={6} className="pressure-main text-normal pressure-high separator py-4">
                    1020 <span className="text-smaller">hPa</span>
                </Col>

                <Col xs={6} xl={3} className=" text-smaller pressure-normal separator py-4">
                    <span className="time">10:00</span>
                    1002 <span className="text-mini">hPa</span>
                </Col>

                <Col xl={3} className=" text-smaller pressure-normal separator py-4 d-none d-xl-block">
                    <span className="time">11:00</span>
                    999 <span className="text-mini">hPa</span>
                </Col>
            </React.Fragment>
        );
    }
}
