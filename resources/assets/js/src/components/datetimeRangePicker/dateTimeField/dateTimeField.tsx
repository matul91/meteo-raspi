import * as React from "react";
import * as Datetime from "react-datetime";

interface IProps {
    name: string;
    placeholder: string;
    onInputChange: any;
}

export default class DateTimeField extends React.Component<IProps, null> {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    public render(): JSX.Element {
        return (
            <Datetime
                onChange={this.onInputChange}
                inputProps={{placeholder: this.props.placeholder}}
            />
        );
    }

    private onInputChange(date): void {
        this.props.onInputChange(date, this.props.name);
    }
}
