import FooterOverview from "components/footer//FooterOverview";
import FooterColumn from "components/footer/FooterColumn";
import loadableOverview from "components/footer/LoadableOverview";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {WindRecord} from "types/weather/WeatherRecords";
import FooterMainColumn from "./FooterMainColumn";

interface Props {
    requiredCellCount: number;
    records: WindRecord[];
    unit: string;
}

class WindOverview extends React.Component<Props> {
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

    protected renderMainColumn = (record: WindRecord, unit: string): JSX.Element => {
        return(
            <FooterMainColumn
                value={record.speed}
                digits={1}
                unit={"%"}
                resolveClassModifier={this.resolveClassModifier}
                className={"wind"}
            />
        );
    }

    protected renderColumn = (record: WindRecord, unit: string, last = false): JSX.Element => {
        return (
            <FooterColumn
                value={record.speed}
                digits={1}
                date={record.date}
                unit={"%"}
                resolveClassModifier={this.resolveClassModifier}
                last={last}
                xlSize={2}
                xsSize={3}
            />
        );
    }

    protected resolveClassModifier = (speed: number): string => {
        return (speed < 1.5) ? "wind-none" : (speed > 3) ? "wind-strong" : "wind-mild";
    }
}

export default loadableOverview(WindOverview);
