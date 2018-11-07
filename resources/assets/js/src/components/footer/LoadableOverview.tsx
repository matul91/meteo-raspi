import LoadingOverview from "components/footer/LoadingOverview";
import * as React from "react";
import {PressureRecord, TemperatureRecord, WindRecord} from "types/weather/WeatherRecords";

interface Props {
    records: TemperatureRecord[] | WindRecord[] | PressureRecord[];
    loaderColor: string;
    requiredCellCount: number;
    isLoading: boolean;
    unit: string;
}

const loadableOverview = (FooterOverview) =>
    class extends React.PureComponent<Props> {
        public render() {
            const { isLoading, loaderColor, requiredCellCount, records} = this.props;

            if (isLoading || records === undefined || requiredCellCount > records.length) {
                return <LoadingOverview color={loaderColor} />;
            }

            return (<FooterOverview {...this.props} />);
        }
    };

export default loadableOverview;
