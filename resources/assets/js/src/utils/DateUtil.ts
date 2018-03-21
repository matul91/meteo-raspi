import * as moment from "moment";
import * as Directions from "../config/constants/directions";

class DateUtil {
    public static formatDateByFormat(date: string, format: string): string {
        return moment(date).format(format);
    }

    public static areDatesNull(dateFrom: string, dateTo: string): boolean {
        return (dateFrom === null && dateTo === null);
    }

    public static calcDiffBetweenDates(dates: {firstDate: string, lastDate: string}, direction: string, diff: number) {
        let dateFrom;
        let dateTo;

        switch (direction) {
            case Directions.MINUS:
                dateTo = moment(dates.firstDate);
                dateFrom = moment(dates.firstDate).subtract(diff, "minutes");
                break;
            case Directions.PLUS:
                dateFrom = moment(dates.lastDate);
                dateTo = moment(dates.lastDate).add(diff, "minutes");
                break;
            default:
                return null;
        }

        return {
            dateFrom,
            dateTo,
        };
    }
}

export default DateUtil;
