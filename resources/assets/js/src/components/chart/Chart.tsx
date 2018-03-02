import axios from "axios";
import * as moment from "moment";
import * as React from "react";
import * as Swipeable from "react-swipeable";
import {HorizontalGridLines, LineMarkSeries, XAxis, XYPlot, YAxis} from "react-vis";
import DatetimeRangePicker from "../datetimeRangePicker/DateTimeRangePicker";
import Loading from "../loading/Loading";

moment.locale("cs");

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
        showedDateFormat: "HH:mm:MM",
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
        let content = <Loading text={"Načítá se"} />;
        const suffix = this.props.suffix ? ` ${this.props.suffix}` : "";

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
                        <XYPlot
                            width={700}
                            height={300}
                            xType={"time"}
                        >
                            <XAxis />
                            <YAxis title={`${this.props.name}${suffix}`}/>
                            <HorizontalGridLines />
                            <LineMarkSeries
                                data={this.state.data}
                            />
                        </XYPlot>

                    </Swipeable>
                    <div className="text-right chart-buttons">
                        <button
                            name="minus"
                            className="btn btn-default btn-space"
                            onClick={this.loadNewDataByEventHandler}
                        >
                            Předchozí
                        </button>
                        <button
                            name="plus"
                            className="btn btn-default"
                            onClick={this.loadNewDataByEventHandler}
                        >
                            Další
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="col-md-6">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.name}: {this.state.initialValue}{suffix}</div>
                    <div className="panel-body">
                        {content}
                    </div>
                </div>
            </div>
        );
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
        let dateFrom;
        let dateTo;
        let diff = 0;

        if (this.state.dateRange.dateFrom !== null && this.state.dateRange.dateTo !== null) {
            diff = moment(this.state.dateRange.dateTo)
                .diff(this.state.dateRange.dateFrom) / 1000 / 60;
        } else {
            diff = 30;
        }

        switch (direction) {
            case "minus":
                dateTo = moment(this.state.dataMeta.firstDate)
                    .format(this.state.dbDateFormat);
                dateFrom = moment(this.state.dataMeta.firstDate)
                    .subtract(diff, "minutes")
                    .format(this.state.dbDateFormat);
                break;
            case "plus":
                dateFrom = moment(this.state.dataMeta.lastDate)
                    .format(this.state.dbDateFormat);
                dateTo = moment(this.state.dataMeta.lastDate)
                    .add(diff, "minutes")
                    .format(this.state.dbDateFormat);
                break;
            default:
                return null;
        }

        this.loadData(dateFrom, dateTo, direction);
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
        let url = this.props.url;
        let dataMeta;

        if (dateFrom !== null && dateTo !== null) {
            url = `${url}/?start_date=${dateFrom}&end_date=${dateTo}`;
        }

        axios.get(url).then((response: any) => {
            const newData = [];

            for (const row of response.data) {
                newData.push({
                    x: moment(row.date).toDate(),
                    y: row[this.props.columnName],
                });
            }

            if (newData[0].x === this.state.initialDate) {
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
                    firstDate: newData[0].x,
                    lastDate: newData[newData.length - 1].x,
                };

                this.setState({
                    data,
                    dataMeta,
                });
            } else {
                dataMeta = {
                    firstDate: newData[0].x,
                    lastDate: newData[newData.length - 1].x,
                };

                this.setState({
                    data: newData,
                    dataMeta,
                });
            }
        });
    }
}
