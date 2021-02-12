import { ONE_MINUTE } from "config/constants/intervals";
import gql from "graphql-tag";
import * as React from "react";
import {ChildProps, graphql} from "react-apollo";
import { BatteryStatus } from "types/batteryStatus/BatteryStatus";

interface Response {
    latestBatteryStatus: BatteryStatus[];
}

const LATEST_PHOTOS_QUERY = gql`
    {
        latestBatteryStatus {
            voltage
            date
        }
    }
`;

class Voltage extends React.Component<ChildProps<{}, Response>> {

    public render() {
        if (this.props.data.loading) { return null; }

        const { latestBatteryStatus } = this.props.data;
        const batteryStatus = latestBatteryStatus[0];

        return (
            <React.Fragment>
                {batteryStatus.voltage.toFixed(2)} V
            </React.Fragment>
        );
    }
}

export default graphql(LATEST_PHOTOS_QUERY, {
    options: {
        pollInterval: ONE_MINUTE,
    },
})(Voltage);
