import * as React from "react";
import DateTimeField from "./dateTimeField/dateTimeField";

interface IProps {
    onInputChange: any;
    onSubmit: any;
}

export default class DateTimeRangePicker extends React.Component<IProps, null> {
    public render(): JSX.Element {
        return (
            <form className="form-inline text-right" onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label className="sr-only">Počáteční datum</label>
                    <DateTimeField
                        name="dateFrom"
                        placeholder="Počáteční datum"
                        onInputChange={this.props.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className="sr-only">Koncové datum</label>
                    <DateTimeField
                        name="dateTo"
                        placeholder="Koncové datum"
                        onInputChange={this.props.onInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-default">Zobrazit</button>
            </form>
        );
    }
}
