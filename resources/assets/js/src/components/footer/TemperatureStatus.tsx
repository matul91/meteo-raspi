import * as React from "react";
import { Col, Container, Row } from "reactstrap";

export default class TemperatureStatus extends React.PureComponent {
    public render(): JSX.Element {
        return(
            <React.Fragment>
                <Col xs="6" className="temperature-main text-normal color-warm separator py-4">
                    18 <span className="text-smaller">°C</span>
                </Col>

                <Col xl={2} xs={3} className=" text-smaller color-cold separator py-4">
                    <span className="time">9:00</span>
                    7 <span className="text-smaller">°C</span>
                </Col>

                <Col xl={2} xs={3} className=" text-smaller color-cold separator py-4">
                    <span className="time">9:00</span>
                    7 <span className="text-smaller">°C</span>
                </Col>

                <Col xl={2} className=" text-smaller color-hot separator py-4 d-none d-xl-block">
                    <span className="time">9:00</span>
                    31 <span className="text-smaller">°C</span>
                </Col>
            </React.Fragment>
        );
    }
}
