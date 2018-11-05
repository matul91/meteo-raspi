import * as React from "react";
import { Col, Container, Fade, Row } from "reactstrap";

interface Props {
    value: number;
    digits: number;
    unit: string;
    className: string;
    resolveClassModifier: (value: number) => string ;
}

export default class FooterMainColumn extends React.Component<Props> {

    public render(): JSX.Element {
        const {className, resolveClassModifier, value, unit} = this.props;
        const classModifier = resolveClassModifier(value);
        return (
            <Col xs={6} className={`${classModifier} ${className}-main text-normal separator py-4`}>
                {value.toFixed(0)} <span className="text-smaller">{unit}</span>
            </Col>
        );
    }
}
