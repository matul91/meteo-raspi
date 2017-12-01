import axios from "axios";
import * as moment from "moment";
import * as React from "react";
import {Line} from "react-chartjs-2";
import DatetimeRangePicker from "../datetimeRangePicker/DateTimeRangePicker";
import Loading from "../loading/Loading";

moment.locale("cs");

interface IState {
    data: number[];
    dateRange: {
        dateFrom: string,
        dateTo: string,
    };
    labels: string[];
    timeFormat: string;
}

interface IProps {
    name: string;
    url: string;
    columnName: string;
    timeFormat?: string;
}

export default class Chart extends React.Component<IProps, IState> {
    public state = {
        data: null,
        dateRange: {
            dateFrom: null,
            dateTo: null,
        },
        labels: null,
        timeFormat: "HH:mm:MM",
    };

    constructor(props) {
        super(props);
        this.datetimeChangeHandler = this.datetimeChangeHandler.bind(this);
        this.showData = this.showData.bind(this);
    }

    public componentDidMount(): void {
        this.loadData();
    }

    public render(): JSX.Element {
        let content = <Loading text={"Načítá se"} />;

        if (this.state.data) {
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
                        label: this.props.name,
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
                        onSubmit={this.showData}
                        onInputChange={this.datetimeChangeHandler}
                        dateFrom={this.state.dateRange.dateFrom}
                        dateTo={this.state.dateRange.dateTo}
                    />
                    <Line data={data} />
                </div>
            );
        }

        return (
            <div className="col-md-6">
                <div className="panel panel-default">
                    <div className="panel-heading">{this.props.name}</div>
                    <div className="panel-body">
                        {content}
                    </div>
                </div>
            </div>
        );
    }

    private datetimeChangeHandler(date, name): void {
        this.setState({
            ...this.state,
            dateRange: {
                ...this.state.dateRange,
                [name]: date.format("YYYY-MM-DD HH:mm:ss"),
            },
        });
    }

    private showData(e): void {
        e.preventDefault();
        if (this.state.dateRange.dateFrom !== null && this.state.dateRange.dateTo !== null) {
            this.loadData(this.state.dateRange.dateFrom, this.state.dateRange.dateTo);
        }
    }

    private loadData(dateFrom: string = null, dateTo: string = null): void {
        let url = this.props.url;
        if (dateFrom !== null && dateTo !== null) {
            url = `${url}/?start_date=${dateFrom}&end_date=${dateTo}`;
        }

        axios.get(url).then((response: any) => {
            const labels: string[] = [];
            const data: number[] = [];

            for (const row of response.data) {
                labels.push(moment(row.date).format(this.state.timeFormat));
                data.push(row[this.props.columnName]);
            }

            this.setState({
                data,
                labels,
            });
        });
    }
}
