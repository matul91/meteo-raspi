import LoadingOverview from "components/footer/LoadingOverview";
import * as DateFormats from "config/constants/dateFormats";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { WindRecord } from "types/weather/WeatherRecords";

interface Props {
    windRecords: WindRecord[];
    loading: boolean;
    unit?: string;
}

export default class WindOverview extends React.Component<Props> {

    private static defaultProps = {
        unit: "m/s",
        windRecords: [],
    };

    public render(): JSX.Element {
        if (this.props.loading || this.props.windRecords.length < 4) {
            return <LoadingOverview color={"#ffb400"} />;
        }

        const lastRecord = this.props.windRecords[0];
        const color = this.resolveWindColor(lastRecord.speed);
        return (
            <React.Fragment>
                <Col xs={6} xl={6} className={`wind-main wind-${color} text-normal separator py-4`}>
                    {lastRecord.speed.toFixed(1)} <span className="text-smaller">{this.props.unit}</span>
                </Col>
                {this.renderColumn(this.props.windRecords[1])}
                {this.renderColumn(this.props.windRecords[2])}
                {this.renderColumn(this.props.windRecords[3], true)}
            </React.Fragment>
        );

    }

    protected renderColumn(record: WindRecord, last = false): JSX.Element {
        const color = this.resolveWindColor(record.speed);
        const bootstrapClasses = (last) ? "d-none d-xl-block" : "" ;
        return (
            <Col
                xl={2}
                xs={(last) ? null : 3}
                className={`wind-${color} text-smaller separator py-4 ${bootstrapClasses}`}
            >
                <span className="time">
                    {moment(record.date).format(DateFormats.HOURS_AND_MINUTES)}
                </span>
                {record.speed.toFixed(1)} <span className="text-mini">{this.props.unit}</span>
            </Col>
        );
    }

    protected resolveWindColor(speed: number): string {
        if (speed < 1.5) {
            return "none";
        }

        return (speed > 3) ? "strong" : "mild";
    }
}
