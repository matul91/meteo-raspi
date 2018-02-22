import axios from "axios";
import * as moment from "moment";
import * as React from "react";
import {Line} from "react-chartjs-2";
import * as Swipeable from "react-swipeable";
import DatetimeRangePicker from "../datetimeRangePicker/DateTimeRangePicker";
import Loading from "../loading/Loading";

moment.locale("cs");

interface IState {
    data: number[];
    dateRange: {
        dateFrom: string,
        dateTo: string,
    };
    dbDateFormat: string;
    initialValue: number;
    labels: string[];
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
        dateRange: {
            dateFrom: null,
            dateTo: null,
        },
        dbDateFormat: "YYYY-MM-DD HH:mm:ss",
        initialValue: null,
        labels: [],
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
            const data = {
                datasets: [
                    {
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderCapStyle: "butt",
                        borderColor: "rgba(75,192,192,1)",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        data: this.state.data,
                        fill: true,
                        label: `${this.props.name}${suffix}`,
                        lineTension: 0.2,
                        pointBackgroundColor: "#fff",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBorderWidth: 1,
                        pointHitRadius: 10,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointHoverRadius: 5,
                        pointRadius: 1,
                    },
                ],
                labels: this.state.labels,
            };
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
                        <Line data={data} />
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
            this.loadData();
        }
    }

    private loadNewDataByEventHandler(e): void {
        const direction = e.target.name;
        this.loadNewDataToChart(direction);
    }

    private loadNewDataToChart(direction: string = null): void {
        console.log(direction);
        if (this.state.dateRange.dateFrom !== null && this.state.dateRange.dateTo !== null) {
            let dateFrom = null;
            let dateTo = null;
            const diff = moment(this.state.dateRange.dateTo)
                .diff(this.state.dateRange.dateFrom) / 1000;

            switch (direction) {
                case "minus":
                    dateTo = moment(this.state.dateRange.dateFrom)
                        .format(this.state.dbDateFormat);
                    dateFrom = moment(this.state.dateRange.dateFrom)
                        .subtract(diff, "seconds")
                        .format(this.state.dbDateFormat);
                    break;
                case "plus":
                    dateFrom = moment(this.state.dateRange.dateTo)
                        .format(this.state.dbDateFormat);
                    dateTo = moment(this.state.dateRange.dateTo)
                        .add(diff, "seconds")
                        .format(this.state.dbDateFormat);
                    break;
                default:
                    return null;
            }

            this.setState({
                ...this.state,
                dateRange: {
                    ...this.state.dateRange,
                    dateFrom,
                    dateTo,
                },
            }, () => this.loadData(direction));
        }
    }

    private loadInitialData(): void {
        const url = `${this.props.url}/latest`;

        axios.get(url).then((response: any) => {
            this.setState({
                ...this.state,
                initialValue: response.data[this.props.columnName],
            });

            const dateTo = response.data.date;
            const dateFrom = moment(dateTo).subtract(30, "minutes").format(this.state.dbDateFormat);

            this.setState({
                ...this.state,
                dateRange: {
                    ...this.state.dateRange,
                    dateFrom,
                    dateTo,
                },
            });

            this.loadData();
        });
    }

    private loadData(direction: string = null): void {
        let url = this.props.url;
        const dateFrom = this.state.dateRange.dateFrom;
        const dateTo = this.state.dateRange.dateTo;

        if (dateFrom !== null && dateTo !== null) {
            url = `${url}/?start_date=${dateFrom}&end_date=${dateTo}`;
        }

        axios.get(url).then((response: any) => {
            const newLabels: string[] = [];
            const newData: number[] = [];

            for (const row of response.data) {
                newLabels.push(moment(row.date).format(this.state.showedDateFormat));
                newData.push(row[this.props.columnName]);
            }

            if (direction) {
                const data = [...this.state.data];
                const labels = [...this.state.labels];

                switch (direction) {
                    case "plus":
                        data.push(...newData);
                        labels.push(...newLabels);
                        break;
                    case "minus":
                        data.unshift(...newData);
                        labels.unshift(...newLabels);
                        break;
                    default:
                        return null;
                }

                this.setState({
                    data,
                    labels,
                });
            } else {
                this.setState({
                    data: newData,
                    labels: newLabels,
                });
            }
        });
    }
}
