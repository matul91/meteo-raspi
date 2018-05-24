/// <reference types="jest" />
import * as Directions from "config/constants/directions";
import DateUtil from "utils/DateUtil";

describe("DateUtil", () => {
    const dbDateFormat =  "YYYY-MM-DD HH:mm:ss";

    it("check if one of dates is null", () => {
        const firstDate = "2018-03-03 12:25:00";
        const secondDate = null;
        expect(DateUtil.areDatesNull(firstDate, secondDate)).toBeTruthy();
    });
    it("check if all dates are not null", () => {
        const firstDate = "2018-03-03 12:25:00";
        const secondDate = "2018-03-04 12:25:00";
        expect(DateUtil.areDatesNull(firstDate, secondDate)).toBeFalsy();
    });
    it("check if differenceBetweenDates return correct dates", () => {
        const testDates = {
            firstDate: "2018-03-03 12:00:00",
            lastDate: "2018-03-03 13:00:00",
        };
        const calculatedDates = DateUtil.differenceBetweenDates(testDates, Directions.MINUS, 60);
        const dates = {
            dateFrom: DateUtil.formatDateByFormat(calculatedDates.dateFrom, dbDateFormat),
            dateTo: DateUtil.formatDateByFormat(calculatedDates.dateTo, dbDateFormat),
        };
        const expectedDates = {
            dateFrom: "2018-03-03 11:00:00",
            dateTo: "2018-03-03 12:00:00",
        };
        expect(dates).toEqual(expectedDates);
    });
    it("check if date is returned in correct format", () => {
        const date = "2018-03-03 12:00:00";
        expect(DateUtil.formatDateByFormat(date, "HH:mm")).toBe("12:00");
    });
});
