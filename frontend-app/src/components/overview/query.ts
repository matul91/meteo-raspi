import gql from "graphql-tag";

export const CURRENT_CONDITIONS_RECORDS_QUERY = gql`
    {
        temperature {
            value:temperature
        }

        wind {
            value:speed
            direction
        }

        pressure {
            value:pressure
        }

        humidity {
            value:humidity
        }
    }
`;
