import axios from "axios";
import * as moment from "moment";
import * as React from "react";
import * as Swipeable from "react-swipeable";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DatetimeRangePicker from "../datetimeRangePicker/DateTimeRangePicker";
import Loading from "../loading/Loading";
import ButtonPanel from "./buttonPanel/ButtonPanel";
import CustomTooltip from "./customTooltip/CustomTooltip";

moment.locale("cs");

const INITIAL_DURATION = 30;

interface IState {
    data: any;
    dataMeta: {
        firstDate: string,
        lastDate: string,
    };
    dateRange: {
        dateFrom: string,
        dateTo: string,
    };
    dbDateFormat: string;
    initialDate: string;
    initialValue: number;
    showedDateFormat: string;
    suffix: string;
}

interface IProps {
    name: string;
    url: string;
    columnName: string;
    showedDateFormat?: string;
    suffix?: string;
}

export default class Chart extends React.Component<IProps, IState> {
    public state = {
        data: [],
        dataMeta: {
            firstDate: null,
            lastDate: null,
        },
        dateRange: {
            dateFrom: null,
            dateTo: null,
        },
        dbDateFormat: "YYYY-MM-DD HH:mm:ss",
        initialDate: null,
        initialValue: null,
        showedDateFormat: "HH:mm",
        suffix: this.props.suffix ? ` ${this.props.suffix}` : "",
    };

    constructor(props) {
        super(props);
        this.datetimeChangedHandler = this.datetimeChangedHandler.bind(this);
        this.loadNewDataByDateHandler = this.loadNewDataByDateHandler.bind(this);
        this.loadNewDataByEventHandler = this.loadNewDataByEventHandler.bind(this);
        this.onSwipedLeft = this.onSwipedLeft.bind(this);
        this.onSwipedRight = this.onSwipedRight.bind(this);
    }

    public componentDidMount(): void {
        this.loadInitialData();
    }

    public render(): JSX.Element {
        let content = <Loading text={"Načítá se..."} />;

        if (this.state.data.length > 0) {
            content = (
                <div className="chart">
                    <DatetimeRangePicker
                        onSubmit={this.loadNewDataByDateHandler}
                        onInputChange={this.datetimeChangedHandler}
                    />
                    <Swipeable
                        onSwipedLeft={this.onSwipedLeft}
                        onSwipedRight={this.onSwipedRight}
                        trackMouse={true}
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart width={830} height={400} data={this.mapDatesToShowingFormat(this.state.data)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Line type="monotone" dataKey="value" />
                                <Tooltip content={<CustomTooltip payload={external} />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Swipeable>
                    <ButtonPanel clickHandler={this.loadNewDataByEventHandler} />
                </div>
            );
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.name}: {this.state.initialValue}{this.state.suffix}</div>
                <div className="panel-body">
                    {content}
                </div>
            </div>
        );
    }

    private mapDatesToShowingFormat(data: Array<{date: string, value: any}>): object[] {
        return data.map((obj) => {
            return {
                date: moment(obj.date).format(this.state.showedDateFormat),
                value: obj.value,
            };
        });
    }

    private onSwipedLeft(): void {
        this.loadNewDataToChart("plus");
    }

    private onSwipedRight(): void {
        this.loadNewDataToChart("minus");
    }

    private datetimeChangedHandler(date, name): void {
        this.setState({
            ...this.state,
            dateRange: {
                ...this.state.dateRange,
                [name]: date.format(this.state.dbDateFormat),
            },
        });
    }

    private loadNewDataByDateHandler(e): void {
        e.preventDefault();
        if (this.state.dateRange.dateFrom !== null && this.state.dateRange.dateTo !== null) {
            this.loadData(this.state.dateRange.dateFrom, this.state.dateRange.dateTo);
        }
    }

    private loadNewDataByEventHandler(e): void {
        const direction = e.target.name;
        this.loadNewDataToChart(direction);
    }

    private loadNewDataToChart(direction: string = null): void {
        let diff = 0;

        if (this.state.dateRange.dateFrom !== null && this.state.dateRange.dateTo !== null) {
            diff = moment(this.state.dateRange.dateTo)
                .diff(this.state.dateRange.dateFrom) / 1000 / 60;
        } else {
            diff = INITIAL_DURATION;
        }

        const dates = this.calculateDiffBetweenDates(direction, diff);
        const dateFrom = this.formatDateToDbFormat(dates.dateFrom);
        const dateTo = this.formatDateToDbFormat(dates.dateTo);

        this.loadData(dateFrom, dateTo, direction);
    }

    private calculateDiffBetweenDates(direction: string, diff: number): {dateFrom: string, dateTo: string} {
        const firstDate = this.state.dataMeta.firstDate;
        const lastDate = this.state.dataMeta.lastDate;
        let dateFrom;
        let dateTo;

        switch (direction) {
            case "minus":
                dateTo = moment(firstDate);
                dateFrom = moment(firstDate).subtract(diff, "minutes");
                break;
            case "plus":
                dateFrom = moment(lastDate);
                dateTo = moment(lastDate).add(diff, "minutes");
                break;
            default:
                return null;
        }

        return {
            dateFrom,
            dateTo,
        };
    }

    private formatDateToDbFormat(date: string): string {
        return moment(date).format(this.state.dbDateFormat);
    }

    private loadInitialData(): void {
        const url = `${this.props.url}/latest`;

        axios.get(url).then((response: any) => {
            this.setState({
                ...this.state,
                initialDate: response.data.date,
                initialValue: response.data[this.props.columnName],
            });

            const dateTo = this.state.initialDate;
            const dateFrom = moment(dateTo).subtract(30, "minutes").format(this.state.dbDateFormat);

            this.loadData(dateFrom, dateTo);
        });
    }

    private loadData(dateFrom: string, dateTo: string, direction: string = null): void {
        const url = this.createRequestURL(dateFrom, dateTo);
        let dataMeta;

        axios.get(url).then((response: any) => {
            const newData: Array<{date: string, value: any}> = this.processResponse(response);

            if (!newData.length || newData[0].date === this.state.initialDate) {
                return;
            }

            if (direction) {
                const data = [...this.state.data];
                switch (direction) {
                    case "plus":
                        data.push(...newData);
                        break;
                    case "minus":
                        data.unshift(...newData);
                        break;
                    default:
                        return null;
                }
                dataMeta = {
                    firstDate: newData[0].date,
                    lastDate: newData[newData.length - 1].date,
                };
                this.setState({
                    data,
                    dataMeta,
                });
            } else {
                dataMeta = {
                    firstDate: newData[0].date,
                    lastDate: newData[newData.length - 1].date,
                };
                this.setState({
                    data: newData,
                    dataMeta,
                });
            }
        });
    }

    private processResponse(response: any): Array<{date: string, value: any}> {
        const newData: Array<{date: string, value: any}> = [];
        const length = this.state.data.length > 0 ? response.data.length - 1 : response.data.length;

        for (let i = 0; i < length; i++) {
            newData.push({
                date: response.data[i].date,
                value: response.data[i][this.props.columnName],
            });
        }

        return newData;
    }

    private createRequestURL(dateFrom: string, dateTo: string): string {
        let url = this.props.url;

        if (dateFrom !== null && dateTo !== null) {
            url = `${url}/?start_date=${dateFrom}&end_date=${dateTo}`;
        }

        return url;
    }
}
