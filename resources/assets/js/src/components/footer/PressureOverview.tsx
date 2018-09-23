import LoadingOverview from "components/footer/LoadingOverview";
import * as DateFormats from "config/constants/dateFormats";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Fade, Row } from "reactstrap";
import { PressureRecord } from "types/weather/WeatherRecords";

interface IProps {
    pressureRecords: PressureRecord[];
    loading: boolean;
    unit?: string;
}

export default class PressureOverview extends React.Component<IProps> {

    private static defaultProps = {
        pressureRecords: [],
        unit: "hPa",
    };

    public render(): JSX.Element {
        if (this.props.loading || this.props.pressureRecords.length < 3) {
            return <LoadingOverview color={"#66f000"} />;
        }

        const lastRecord = this.props.pressureRecords[0];
        const color = this.resolvePressureColor(lastRecord.pressure);
        return (
            <React.Fragment>
                <Col xs={6} xl={6} className={`pressure-main text-normal pressure-${color} separator py-4`}>
                    {lastRecord.pressure.toFixed(0)} <span className="text-smaller">{this.props.unit}</span>
                </Col>
                {this.renderColumn(this.props.pressureRecords[1])}
                {this.renderColumn(this.props.pressureRecords[2], true)}
            </React.Fragment>
        );

    }

    protected renderColumn(record: PressureRecord, last = false): JSX.Element {
        const color = this.resolvePressureColor(record.pressure);
        const bootstrapClasses = (last) ? "d-none d-xl-block" : "" ;
        return (
            <Col
                xl={3}
                xs={(last) ? null : 6}
                className={`text-smaller pressure-${color} separator py-4 ${bootstrapClasses}`}
            >
                    <span className="time">
                        {moment(record.date).format(DateFormats.HOURS_AND_MINUTES)}
                    </span>
                {record.pressure.toFixed(0)} <span className="text-mini">{this.props.unit}</span>
            </Col>
        );
    }

    protected resolvePressureColor(pressure: number): string {
        if (pressure < 1000) {
            return "low";
        }

        return (pressure > 1013) ? "high" : "normal";
    }
}
