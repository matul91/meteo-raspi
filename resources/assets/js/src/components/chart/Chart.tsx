import Alert from "components/alert/Alert";
import ButtonPanel from "components/chart/buttonPanel/ButtonPanel";
import ChartPanel from "components/chart/chartPanel/ChartPanel";
import CustomTooltip from "components/chart/customTooltip/CustomTooltip";
import DatetimeRangePicker from "components/datetimeRangePicker/DateTimeRangePicker";
import Loading from "components/loading/Loading";
import * as DateFormats from "config/constants/dateFormats";
import * as Directions from "config/constants/directions";
import * as Values from "config/constants/values";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import * as Swipeable from "react-swipeable";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as actions from "store/actions";
import ArrayUtil from "utils/ArrayUtil";
import DateUtil from "utils/DateUtil";

moment.locale("cs");

interface IState {
    dateRange: {
        dateFrom: string,
        dateTo: string,
    };
    suffix: string;
}

interface IProps {
    setName: string;
    data: any;
    dataMeta: {
        firstDate: string,
        lastDate: string,
    };
    dbDateFormat: string;
    error: {
        type: string,
        style: string,
    };
    initialDate: string;
    initialValue: number;
    name: string;
    url: string;
    columnName: string;
    onRefreshData: any;
    onResetError: any;
    showedDateFormat?: string;
    suffix?: string;
    loading: boolean;
}

class Chart extends React.Component<IProps, IState> {
    public state = {
        dateRange: {
            dateFrom: null,
            dateTo: null,
        },
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

        if (!this.props.loading) {
            content = (!this.props.data) ? <p>There are no data to show.</p> : (
                <div className="chart mb-4">
                    {this.props.error && <Alert type={this.props.error.type} cls={this.props.error.style}/>}
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
                date: moment(obj.date).format(DateFormats.HOURS_AND_MINUTES),
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
                [name]: date.format(this.props.dbDateFormat),
            },
        });
    }

    private refreshDataByDateChangeHandler(e): void {
        e.preventDefault();

        const { dateFrom, dateTo } = this.state.dateRange;
        if (!DateUtil.areDatesNull(dateFrom, dateTo)) {
            this.props.onResetError(this.props.setName);
            this.props.onRefreshData(dateFrom, dateTo, this.props.setName);
        }
    }

    private refreshDataByEventHandler(e): void {
        const direction = e.target.name;
        this.loadDataToChart(direction);
    }

    private loadDataToChart(direction: string = null): void {
        let diff = 0;
        let { dateFrom, dateTo } = this.state.dateRange;

        if (!DateUtil.areDatesNull(dateFrom, dateTo) && !this.props.error) {
            diff = moment(this.state.dateRange.dateTo)
                .diff(this.state.dateRange.dateFrom) / 1000 / 60;
        } else {
            diff = Values.INITIAL_DATETIME_RANGE;
        }

        const dates = DateUtil.differenceBetweenDates(this.props.dataMeta, direction, diff);
        dateFrom = DateUtil.formatDateByFormat(dates.dateFrom, this.props.dbDateFormat);
        dateTo = DateUtil.formatDateByFormat(dates.dateTo, this.props.dbDateFormat);

        this.props.onResetError(this.props.setName);
        this.props.onRefreshData(dateFrom, dateTo, this.props.setName, direction);
    }
}

const mapStateToProps = (state) => {
    return {
        dbDateFormat: state.weather.dbDateFormat,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefreshData: (dateFrom, dateTo, setName, direction = null) => {
            dispatch(actions.refreshDataSet(dateFrom, dateTo, setName, direction));
        },
        onResetError: (setName) => dispatch(actions.dataSetResetError(setName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
