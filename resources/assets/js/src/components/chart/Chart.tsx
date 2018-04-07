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
    dateRange: {
        dateFrom: string,
        dateTo: string,
    };
    dbDateFormat: string;
    error: {
        type: string,
        style: string,
    };
    showedDateFormat: string;
    suffix: string;
}

interface IProps {
    data: any;
    dataMeta: {
        firstDate: string,
        lastDate: string,
    };
    initialDate: string;
    initialValue: number;
    name: string;
    url: string;
    columnName: string;
    showedDateFormat?: string;
    suffix?: string;
}

export default class Chart extends React.Component<IProps, IState> {
    public state = {
        dateRange: {
            dateFrom: null,
            dateTo: null,
        },
        dbDateFormat: "YYYY-MM-DD HH:mm:ss",
        error: null,
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

    public render(): JSX.Element {
        let content = <Loading text={"Načítá se..."} />;
        const heading = (this.props.initialValue) ?
            `${this.props.name}: ${this.props.initialValue}${this.state.suffix}` : "Načítání";

        if (this.props.data && this.props.data.length > 1) {
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
                            <LineChart data={this.mapDatesToShowingFormat(this.props.data)}>
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
                        initialDate={this.props.initialDate}
                        lastDate={this.props.data[this.props.data.length - 1].date}
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
        if (!DateUtil.areDatesNull(dateFrom, dateTo)) {
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

        if (!DateUtil.areDatesNull(dateFrom, dateTo) && !this.state.error) {
            diff = moment(this.state.dateRange.dateTo)
                .diff(this.state.dateRange.dateFrom) / 1000 / 60;
        } else {
            diff = INITIAL_DURATION;
        }

        const dates = DateUtil.differenceBetweenDates(this.props.dataMeta, direction, diff);
        dateFrom = DateUtil.formatDateByFormat(dates.dateFrom, this.state.dbDateFormat);
        dateTo = DateUtil.formatDateByFormat(dates.dateTo, this.state.dbDateFormat);

        this.loadData(dateFrom, dateTo, direction);
    }

    private loadData(dateFrom: string, dateTo: string, direction: string = null): void {
        this.setError();
        const url = URLUtil.generateURLByDates(this.props.url, dateFrom, dateTo);
        let dataMeta;

        /* axios.get(url).then((response: any) => {
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
        }); */
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
