import * as React from "react";

const ChartPanel = (props) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">{props.heading}</div>
            <div className="panel-body">
                {props.children}
            </div>
        </div>
    );
};

export default ChartPanel;
