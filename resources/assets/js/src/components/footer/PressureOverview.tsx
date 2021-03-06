import loadableOverview from "components/footer/LoadableOverview";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Fade, Row } from "reactstrap";
import { PressureRecord } from "types/weather/WeatherRecords";
import FooterColumn from "./FooterColumn";
import FooterMainColumn from "./FooterMainColumn";
import FooterOverview from "./FooterOverview";

interface Props {
    requiredCellCount: number;
    records: PressureRecord[];
    unit: string;
}

class PressureOverview extends React.Component<Props> {
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

    protected renderMainColumn = (record: PressureRecord, unit: string): JSX.Element => {
        return(
           <FooterMainColumn
               value={record.pressure}
               digits={0}
               unit={unit}
               resolveClassModifier={this.resolveClassModifier}
               className={"pressure"}
           />
        );
    }

    protected renderColumn = (record: PressureRecord, unit: string, last = false): JSX.Element => {
        return (
            <FooterColumn
                value={record.pressure}
                digits={0}
                date={record.date}
                unit={unit}
                resolveClassModifier={this.resolveClassModifier}
                last={last}
                xlSize={3}
                xsSize={6}
            />
        );
    }

    protected resolveClassModifier = (pressure: number): string => {
        return (pressure < 1000) ? "pressure-low" : (pressure > 1013) ? "pressure-high" : "pressure-normal";
    }
}

export default loadableOverview(PressureOverview);
