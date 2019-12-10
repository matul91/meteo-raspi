import Icon from "components/svgIcon/SvgIcon";
import * as React from "react";
import {Col, Row} from "reactstrap";

interface Props {
    position: number;
    speed: number;
    direction: string;
    unit: string;
    time: string;
}

class WindDirectionArrow extends React.PureComponent<Props> {

    public render(): JSX.Element {
        const { position, speed, direction, unit } = this.props;
        const remainingPositionToFullRow = 12 - position;

        return (
            <Row noGutters={true} className={"wind-row"}>
                <Col xs={position}/>
                <Col xs={remainingPositionToFullRow}>
                    <Icon kind="arrow-up" size={50} className={`wind-direction-arrow ${direction}`}/>
                    <span className={"wind-direction-text"}>{speed} {unit}</span>
                </Col>
            </Row>
        );
    }
}

export default WindDirectionArrow;
