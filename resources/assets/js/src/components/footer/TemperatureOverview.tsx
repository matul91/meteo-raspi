import loadableOverview from "components/footer/LoadableOverview";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { TemperatureRecord } from "types/weather/WeatherRecords";
import FooterColumn from "./FooterColumn";
import FooterMainColumn from "./FooterMainColumn";
import FooterOverview from "./FooterOverview";

interface Props {
    requiredCellCount: number;
    records: TemperatureRecord[];
    unit: string;
}

class TemperatureOverview extends React.Component<Props> {

    constructor(props: Props, context: any) {
        super(props, context);
        this.resolveClassModifier = this.resolveClassModifier.bind(this);
        this.renderMainColumn = this.renderMainColumn.bind(this);
        this.renderColumn = this.renderColumn.bind(this);
    }

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

    protected renderMainColumn(record: TemperatureRecord, unit: string): JSX.Element {
        return(
            <FooterMainColumn
                value={record.temperature}
                digits={1}
                unit={unit}
                resolveClassModifier={this.resolveClassModifier}
                className={"temperature"}
            />
        );
    }

    protected renderColumn(record: TemperatureRecord, unit: string, last = false): JSX.Element {
        return (
            <FooterColumn
                value={record.temperature}
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

    protected resolveClassModifier(temperature: number): string {
        return (temperature < 15) ? "temperature-cold" : (temperature > 30) ? "temperature-warm" : "temperature-hot";
    }
}

export default loadableOverview(TemperatureOverview);
