import axios from "axios";
import * as Positions from "../../config/constants/positions";
import ArrayUtil from "../../utils/ArrayUtil";
import URLUtil from "../../utils/URLUtil";
import * as actionTypes from "./actionTypes";

export const weatherLoadStart = () => {
    return {
        type: actionTypes.WEATHER_LOAD_START,
    };
};

export const weatherLoadSuccess = (charts) => {
    return {
        charts,
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const weatherLoadFail = (error) => {
    return {
        error,
        type: actionTypes.WEATHER_LOAD_FAIL,
    };
};

export const weatherLoad = () => {
    return (dispatch, getState) => {
        dispatch(weatherLoadStart());
        Object.keys(getState().weather.charts).map((chartName) => {
            dispatch(loadChartData(getState().weather.charts[chartName]));
        });
    };
};

export const loadChartData = (chart) => {
    return (dispatch) => {
        console.log(chart);
        const url = URLUtil.generateURLByPosition(chart.url, Positions.LATEST);
        axios.get(url).then((response: any) => {
            const newChartData = {
                ...chart,
                initialDate: response.data.date,
                initialValue: response.data[this.props.columnName],
            };
        });
    };
};

const loadData = (dateFrom: string, dateTo: string, direction: string = null) => {
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
};
