import { DEFAULT_DATETIME_FORMAT } from "config/constants/dateFormats";
import * as React from "react";
import Clock from "react-live-clock";

const HeaderClock = () => {
    return (
        <React.Fragment>
            <strong>
                <Clock format={"LT"} ticking={true} />
                <span> | </span>
            </strong>
            <Clock format={DEFAULT_DATETIME_FORMAT} ticking={true}/>
        </React.Fragment>
    );
};

export default HeaderClock;
