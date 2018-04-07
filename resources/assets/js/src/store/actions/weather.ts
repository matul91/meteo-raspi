import axios from "axios";
import * as moment from "moment";
import * as AlertStyles from "../../config/constants/alertStyles";
import * as Errors from "../../config/constants/errors";
import * as Positions from "../../config/constants/positions";
import ArrayUtil from "../../utils/ArrayUtil";
import URLUtil from "../../utils/URLUtil";
import * as actionTypes from "./actionTypes";

export const weatherLoadStart = () => {
    return {
        type: actionTypes.WEATHER_LOAD_START,
    };
};

export const weatherLoadSuccess = () => {
    return {
        type: actionTypes.WEATHER_LOAD_SUCCESS,
    };
};

export const weatherLoadFail = (error) => {
    return {
        error,
        type: actionTypes.WEATHER_LOAD_FAIL,
    };
};

export const dataSetLoadSuccess = (setName, dataSet) => {
    return {
        dataSet,
        setName,
        type: actionTypes.DATASET_LOAD_SUCCESS,
    };
};

export const weatherLoad = () => {
    return (dispatch, getState) => {
        dispatch(weatherLoadStart());
        Object.keys(getState().weather.dataSets).map((setName) => {
            dispatch(initializeChartData(setName));
        });
        dispatch(weatherLoadSuccess());
    };
};

export const initializeChartData = (setName) => {
    return (dispatch, getState) => {
        const dataSet = getState().weather.dataSets[setName];
        const url = URLUtil.generateURLByPosition(dataSet.url, Positions.LATEST);
        axios.get(url).then((response: any) => {
            let newData = {
                ...dataSet,
                initialDate: response.data.date,
                initialValue: response.data[dataSet.columnName],
            };
            const dateTo = newData.initialDate;
            const dateFrom = moment(dateTo).subtract(30, "minutes").format(getState().weather.dbDateFormat);
            loadData(dateFrom, dateTo, dataSet).then((loadedData) => {
                newData = {
                    ...newData,
                    data: loadedData.data,
                    dataMeta: loadedData.dataMeta,
                };
                dispatch(dataSetLoadSuccess(setName, newData));
            });
        });
    };
};

export const refreshDataSet = (dateFrom: string, dateTo: string, setName: string, direction = null) => {
    return (dispatch, getState) => {
        const dataSet = getState().weather.dataSets[setName];
        loadData(dateFrom, dateTo, dataSet, direction).then((loadedData) => {
            const newData = {
                ...dataSet,
                data: loadedData.data,
                dataMeta: loadedData.dataMeta,
            };
            dispatch(dataSetLoadSuccess(setName, newData));
        });
    };
};

const loadData = (dateFrom: string, dateTo: string, dataSet: any, direction = null) => {
    const url = URLUtil.generateURLByDates(dataSet.url, dateFrom, dateTo);
    return axios.get(url).then((response: any) => {
        let dataMeta;
        let data;
        const newData = processResponse(response, dataSet.columnName);

        if (checkData(newData, dataSet.initialDate)) {
            return;
        }

        if (direction) {
            data = ArrayUtil.destructureDataArrays(direction, dataSet.data, newData);
            data = ArrayUtil.removeDuplicities(data);
            dataMeta = { firstDate: data[0].date, lastDate: data[data.length - 1].date };
        } else {
            data = newData;
            dataMeta = { firstDate: newData[0].date, lastDate: newData[newData.length - 1].date };
        }

        return { data, dataMeta };
    });
};

const processResponse = (response: any, columnName: string): Array<{date: string, value: any}> => {
    return response.data.map((row) => {
        return {
            date: row.date,
            value: row[columnName],
        };
    });
};

const checkData = (data, initialDate): boolean => {
    let hasError = false;

    if (!data.length) {
        hasError = true;
    } else if (data[0].date === initialDate) {
        hasError = true;
    }

    return hasError;
};
