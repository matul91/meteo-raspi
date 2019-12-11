import * as DateFormats from "config/constants/dateFormats";
import * as moment from "moment";
import * as React from "react";
import { Col, Container, Fade, Row } from "reactstrap";

interface Props {
    value: number;
    digits: number;
    date: string;
    unit: string;
    resolveClassModifier: (value: number) => string ;
    last: boolean;
    xlSize: number;
    xsSize: number;
}

export default class FooterColumn extends React.Component<Props> {

    public render(): JSX.Element {
        const {value, digits, date, unit, last, xlSize, xsSize} = this.props;
        const lastCellClasses = (last) ? "d-none d-xl-block" : "" ;
        const modifierClass = this.props.resolveClassModifier(value);
        return (
            <Col
                xl={xlSize}
                xs={(last) ? null : xsSize}
                className={`${modifierClass} text-smaller separator py-4 ${lastCellClasses}`}
            >
                    <span className="time">
                        {moment(date).add(1, "hours").format(DateFormats.HOURS_AND_MINUTES)}
                    </span>
                {value.toFixed(digits)} <span className="text-mini">{unit}</span>
            </Col>
        );
    }
}
