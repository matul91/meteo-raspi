import $ from "jquery";
import * as React from "react";
import { findDOMNode } from "react-dom";

interface IProps {
    dateFrom: string;
    dateTo: string;
    onInputChange: any;
    onSubmit: any;
}

const DatetimeRangePicker: any = (props) => {
    return (
        <form className="form-inline text-right" onSubmit={props.onSubmit}>
            <div className="form-group">
                <label className="sr-only">Počáteční datum</label>
                <input
                    type="text"
                    name="dateFrom"
                    className="form-control"
                    placeholder="Počáteční datum"
                    defaultValue={props.dateFrom}
                    onChange={props.onInputChange}
                />
            </div>
            <div className="form-group">
                <label className="sr-only">Koncové datum</label>
                <input
                    type="text"
                    name="dateTo"
                    className="form-control"
                    placeholder="Koncové datum"
                    defaultValue={props.dateTo}
                    onChange={props.onInputChange}
                />
            </div>
            <button type="submit" className="btn btn-default">Zobrazit</button>
        </form>
    );
};

export default DatetimeRangePicker;
