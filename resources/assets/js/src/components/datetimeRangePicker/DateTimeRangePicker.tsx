import DateTimeField from "components/datetimeRangePicker/dateTimeField/dateTimeField";
import * as React from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";

interface IProps {
    onInputChange: any;
    onSubmit: any;
}

const formInputs = [
    {
        name: "dateFrom",
        placeholder: "Počáteční datum",
    },
    {
        name: "dateTo",
        placeholder: "Koncové datum",
    },
];

export default class DateTimeRangePicker extends React.Component<IProps, null> {
    public render(): JSX.Element {
        const inputs = this.getFormInputs();

        return (
            <Row>
                <Col xs={12} className="text-right form-bottom-space">
                    <Form inline={true}>
                        {inputs}
                        <Button onClick={this.props.onSubmit}>Zobrazit</Button>
                    </Form>
                </Col>
            </Row>
        );
    }

    private getFormInputs(): JSX.Element[] {
        return formInputs.map((input) => {
            return (
                <FormGroup
                    key={input.name}
                    className="form-space"
                >
                    <DateTimeField
                        name={input.name}
                        placeholder={input.placeholder}
                        onInputChange={this.props.onInputChange}
                    />
                </FormGroup>
            );
        });
    }
}
