import axios from "axios";
import * as moment from "moment";
import * as React from "react";
import * as Swipeable from "react-swipeable";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as AlertStyles from "../../config/constants/alertStyles";
import * as Directions from "../../config/constants/directions";
import * as Errors from "../../config/constants/errors";
import * as Positions from "../../config/constants/positions";
import ArrayUtil from "../../utils/ArrayUtil";
import DateUtil from "../../utils/DateUtil";
import URLUtil from "../../utils/URLUtil";
import Alert from "../alert/Alert";
import DatetimeRangePicker from "../datetimeRangePicker/DateTimeRangePicker";
import Loading from "../loading/Loading";
import ButtonPanel from "./buttonPanel/ButtonPanel";
import ChartPanel from "./chartPanel/ChartPanel";
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
    error: {
        type: string,
        style: string,
    };
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
        error: null,
        initialDate: null,
        initialValue: null,
        showedDateFormat: "HH:mm",
        suffix: this.props.suffix ? ` ${this.props.suffix}` : "",
    };

    constructor(props) {
        super(props);
        this.datetimeChangedHandler = this.datetimeChangedHandler.bind(this);
        this.refreshDataByDateChangeHandler = this.refreshDataByDateChangeHandler.bind(this);
        this.refreshDataByEventHandler = this.refreshDataByEventHandler.bind(this);
        this.onSwipedLeft = this.onSwipedLeft.bind(this);
        this.onSwipedRight = this.onSwipedRight.bind(this);
    }

    public componentDidMount(): void {
        this.initializeComponentData();
    }

    public render(): JSX.Element {
        let content = <Loading text={"Načítá se..."} />;
        const heading = (this.state.initialValue) ?
            `${this.props.name}: ${this.state.initialValue}${this.state.suffix}` : "Načítání";

        if (this.state.data.length > 0) {
            content = (
                <div className="chart">
                    {this.state.error && <Alert type={this.state.error.type} cls={this.state.error.style}/>}
                    <DatetimeRangePicker
                        onSubmit={this.refreshDataByDateChangeHandler}
                        onInputChange={this.datetimeChangedHandler}
                    />
                    <Swipeable
                        onSwipedLeft={this.onSwipedLeft}
                        onSwipedRight={this.onSwipedRight}
                        trackMouse={true}
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={this.mapDatesToShowingFormat(this.state.data)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Line type="monotone" dataKey="value" />
                                <Tooltip content={<CustomTooltip payload={external} />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Swipeable>
                    <ButtonPanel
                        clickHandler={this.refreshDataByEventHandler}
                        initialDate={this.state.initialDate}
                        lastDate={this.state.data[this.state.data.length - 1].date}
                    />
                </div>
            );
        }

        return (
            <ChartPanel heading={heading}>
                {content}
            </ChartPanel>
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
        this.loadDataToChart(Directions.PLUS);
    }

    private onSwipedRight(): void {
        this.loadDataToChart(Directions.MINUS);
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

    private refreshDataByDateChangeHandler(e): void {
        e.preventDefault();

        const { dateFrom, dateTo } = this.state.dateRange;
        if (DateUtil.areDatesNull(dateFrom, dateTo) !== true) {
            console.log(DateUtil.areDatesNull(dateFrom, dateTo));
            this.loadData(this.state.dateRange.dateFrom, this.state.dateRange.dateTo);
        }
    }

    private refreshDataByEventHandler(e): void {
        const direction = e.target.name;
        this.loadDataToChart(direction);
    }

    private loadDataToChart(direction: string = null): void {
        let diff = 0;
        let { dateFrom, dateTo } = this.state.dateRange;

        if (DateUtil.areDatesNull(dateFrom, dateTo) !== true && !this.state.error) {
            diff = moment(this.state.dateRange.dateTo)
                .diff(this.state.dateRange.dateFrom) / 1000 / 60;
        } else {
            diff = INITIAL_DURATION;
        }

        const dates = DateUtil.calcDiffBetweenDates(this.state.dataMeta, direction, diff);
        dateFrom = DateUtil.formatDateByFormat(dates.dateFrom, this.state.dbDateFormat);
        dateTo = DateUtil.formatDateByFormat(dates.dateTo, this.state.dbDateFormat);

        this.loadData(dateFrom, dateTo, direction);
    }

    private initializeComponentData(): void {
        const url = URLUtil.generateURLByPosition(this.props.url, Positions.LATEST);

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
        this.setError();
        const url = URLUtil.generateURLByDates(this.props.url, dateFrom, dateTo);
        let dataMeta;

        axios.get(url).then((response: any) => {
            const newData = this.processResponse(response);
            if (!this.checkData(newData)) {
                return;
            }

            if (direction) {
                let data = ArrayUtil.destructureDataArrays(direction, this.state.data, newData);
                data = ArrayUtil.removeDuplicities(data);
                dataMeta = { firstDate: data[0].date, lastDate: data[data.length - 1].date };
                this.setState({ data, dataMeta });
            } else {
                dataMeta = { firstDate: newData[0].date, lastDate: newData[newData.length - 1].date };
                this.setState({ data: newData, dataMeta });
            }
        });
    }

    private processResponse(response: any): Array<{date: string, value: any}> {
        return response.data.map((row) => {
            return {
                date: row.date,
                value: row[this.props.columnName],
            };
        });
    }

    private checkData(data): boolean {
        let ret: boolean = true;

        if (!data.length) {
            this.setError(Errors.NO_DATA, AlertStyles.DANGER);
            ret = false;
        } else if (data[0].date === this.state.initialDate) {
            ret = false;
        }

        return ret;
    }

    private setError(type: string = null, style: string = null): void {
        if (type && style) {
            this.setState({
                error: {
                    style,
                    type,
                },
            });
        } else {
            this.setState({
                error: null,
            });
        }
    }
}
