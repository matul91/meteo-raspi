import LoadingOverview from "components/footer/LoadingOverview";
import * as DateFormats from "config/constants/dateFormats";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { TemperatureRecord } from "types/weather/WeatherRecords";

interface Props {
    temperatureRecords: TemperatureRecord[];
    loading: boolean;
    unit?: string;
}

export default class TemperatureOverview extends React.Component<Props> {

    private static defaultProps = {
        temperatureRecords: [],
        unit: "°C",
    };

    public render(): JSX.Element {
        if (this.props.loading || this.props.temperatureRecords.length < 4) {
            return <LoadingOverview color={"#6e96f2"} />;
        }

        const lastRecord = this.props.temperatureRecords[0];
        const color = this.resolveTemperatureColor(lastRecord.temperature);
        return (
            <React.Fragment>
                <Col xs={6} xl={6} className={`temperature-main temperature-${color} text-normal separator py-4`}>
                    {lastRecord.temperature.toFixed(1)} <span className="text-smaller">{this.props.unit}</span>
                </Col>
                {this.renderColumn(this.props.temperatureRecords[1])}
                {this.renderColumn(this.props.temperatureRecords[2])}
                {this.renderColumn(this.props.temperatureRecords[3], true)}
            </React.Fragment>
        );

    }

    protected renderColumn(record: TemperatureRecord, last = false): JSX.Element {
        const color = this.resolveTemperatureColor(record.temperature);
        const bootstrapClasses = (last) ? "d-none d-xl-block" : "" ;
        return (
            <Col
                xl={2}
                xs={(last) ? null : 3}
                className={`temperature-${color} text-smaller separator py-4 ${bootstrapClasses}`}
            >
                    <span className="time">
                        {moment(record.date).format(DateFormats.HOURS_AND_MINUTES)}
                    </span>
                {record.temperature.toFixed(1)} <span className="text-mini">{this.props.unit}</span>
            </Col>
        );
    }

    protected resolveTemperatureColor(temperature: number): string {
        if (temperature < 15) {
            return "cold";
        }

        return (temperature > 30) ? "warm" : "hot";
    }
}
