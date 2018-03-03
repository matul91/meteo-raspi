import * as React from "react";

interface IProps {
    payload: any;
}

export default class Chart extends React.Component<IProps, null> {
    public render(): JSX.Element {
        let content = null;

        const finalStyle = {
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            margin: 0,
            padding: 10,
            whiteSpace: "nowrap",
        };

        const {payload} = this.props;
        if (payload && payload.length) {
            content = (
                <div>
                    <p><strong>{payload[0].payload.date}</strong></p>
                    <p>Hodnota: {payload[0].payload.value}{payload[0].payload.unit}</p>
                </div>
            );
        }
        return (
            <div style={finalStyle}>
                {payload && payload.length ? content : ""}
            </div>
        );
    }
}
