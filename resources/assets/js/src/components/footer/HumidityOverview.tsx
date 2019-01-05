import loadableOverview from "components/footer/LoadableOverview";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {HumidityRecord} from "types/weather/WeatherRecords";
import FooterColumn from "./FooterColumn";
import FooterMainColumn from "./FooterMainColumn";
import FooterOverview from "./FooterOverview";

interface Props {
    requiredCellCount: number;
    records: HumidityRecord[];
    unit: string;
}

class HumidityOverview extends React.Component<Props> {
    public render(): JSX.Element {
        const {requiredCellCount, records, unit} = this.props;
        return (
            <FooterOverview
                requiredCellCount={requiredCellCount}
                records={records}
                renderMainColumn={this.renderMainColumn}
                renderColumn={this.renderColumn}
                unit={unit}
            />
        );
    }

    protected renderMainColumn = (record: HumidityRecord, unit: string): JSX.Element => {
        return(
            <FooterMainColumn
                value={record.humidity}
                digits={1}
                unit={unit}
                resolveClassModifier={this.resolveClassModifier}
                className={"humidity"}
            />
        );
    }

    protected renderColumn = (record: HumidityRecord, unit: string, last = false): JSX.Element => {
        return (
            <FooterColumn
                value={record.humidity}
                digits={1}
                date={record.date}
                unit={unit}
                resolveClassModifier={this.resolveClassModifier}
                last={last}
                xlSize={2}
                xsSize={3}
            />
        );
    }

    protected resolveClassModifier = (humidity: number): string => {
        return (humidity < 30) ? "humidity-low" : (humidity > 60) ? "humidity-high" : "humidity-medium";
    }
}

export default loadableOverview(HumidityOverview);
