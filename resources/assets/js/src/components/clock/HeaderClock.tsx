import * as React from "react";
import Clock from "react-live-clock";

const HeaderClock = () => {
    return (
        <React.Fragment>
            <strong>
                <Clock format={"LT"} ticking={true} />
                <span> | </span>
            </strong>
            <Clock format={"dddd Do MMMM"} ticking={true}/>
        </React.Fragment>
    );
};

export default HeaderClock;
