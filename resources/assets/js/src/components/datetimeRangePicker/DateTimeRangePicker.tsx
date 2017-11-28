import * as React from "react";

interface IProps {
    dateFrom: string;
    dateTo: string;
    onInputChange: any;
    onSubmit: any;
}

const DatetimeRangePicker: any = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <input
                type="text"
                name="dateFrom"
                defaultValue={props.dateFrom}
                onChange={props.onInputChange}
            />
            <input
                type="text"
                name="dateTo"
                defaultValue={props.dateTo}
                onChange={props.onInputChange}
            />
            <button>Zobrazit</button>
        </form>
    );
};

export default DatetimeRangePicker;
