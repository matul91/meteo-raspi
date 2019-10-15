import * as React from "react";
import {ChildProps, graphql} from "react-apollo";
import { connect } from "react-redux";
import {Col, Row} from "reactstrap";

import gql from "graphql-tag";
import {ONE_MINUTE} from "../../config/constants/intervals";
import {WindRecord} from "../../types/weather/WeatherRecords";
import WindDirectionArrow from "./WindDirectionArrow";

const LATEST_WIND_QUERY = gql`
    {
        latestWinds(limit: 6)  {
            speed
            direction
            date
        }
    }
`;

interface Response {
    latestWinds: WindRecord[];
}

const WindDirection = (props: ChildProps<{}, Response>) => {
    if (props.data.loading) {
        return null;
    }

    const winds = props.data.latestWinds;

    return (
        <React.Fragment>
            <WindDirectionArrow
                unit={"m/s"}
                position={1}
                direction={winds[0].direction}
                speed={winds[0].speed}
                time={winds[0].date}
            />
            <WindDirectionArrow
                unit={"m/s"}
                position={10}
                direction={winds[1].direction}
                speed={winds[1].speed}
                time={winds[1].date}
            />
            <WindDirectionArrow
                unit={"m/s"}
                position={6}
                direction={winds[2].direction}
                speed={winds[2].speed}
                time={winds[2].date}
            />

            <WindDirectionArrow
                unit={"m/s"}
                position={3}
                direction={winds[3].direction}
                speed={winds[3].speed}
                time={winds[3].date}
            />

            <WindDirectionArrow
                unit={"m/s"}
                position={1}
                direction={winds[4].direction}
                speed={winds[4].speed}
                time={winds[4].date}
            />
            <WindDirectionArrow
                unit={"m/s"}
                position={8}
                direction={winds[5].direction}
                speed={winds[5].speed}
                time={winds[5].date}
            />
        </React.Fragment>
    );
};

export default graphql(LATEST_WIND_QUERY, {
    options: {
        pollInterval: ONE_MINUTE,
    },
})(WindDirection);
