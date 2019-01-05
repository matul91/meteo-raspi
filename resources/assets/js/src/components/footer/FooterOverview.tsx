import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {HumidityRecord, PressureRecord, TemperatureRecord, WindRecord} from "types/weather/WeatherRecords";

interface Props {
    requiredCellCount: number;
    records: TemperatureRecord[] | WindRecord[] | PressureRecord[] | HumidityRecord[];
    unit: string;
    renderMainColumn: (
        records: TemperatureRecord | WindRecord | PressureRecord | HumidityRecord,
        unit: string,
    ) => JSX.Element;
    renderColumn: (
        records: TemperatureRecord | WindRecord | PressureRecord | HumidityRecord,
        unit: string,
        last: boolean,
    ) => JSX.Element;
}

export default class FooterOverview extends React.Component<Props> {

    public render(): JSX.Element {
        const {records, unit} = this.props;
        return (
            <React.Fragment>
                {this.props.renderMainColumn(records[0], unit)}
                {this.renderColumns()}
            </React.Fragment>
        );
    }

    protected  renderColumns() {
        return [...Array(this.props.requiredCellCount)].map(
            (value, index) => {
                const {requiredCellCount, renderColumn, records, unit} = this.props;
                if (index === 0) {
                    return;
                }
                const last = index === requiredCellCount - 1;
                return (
                    <React.Fragment key={index}>
                        {renderColumn(records[index], unit, last)}
                    </React.Fragment>
                );
            },
        );
    }
}
