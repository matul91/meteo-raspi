import * as Directions from "config/constants/directions";
import * as moment from "moment";

class DateUtil {
    public static formatDateByFormat(date: string, format: string): string {
        return moment(date).format(format);
    }

    public static areDatesNull(dateFrom: string, dateTo: string): boolean {
        return (dateFrom === null || dateTo === null);
    }

    public static differenceBetweenDates(dates: {firstDate: string, lastDate: string}, direction, diff) {
        let dateFrom;
        let dateTo;
        const { firstDate, lastDate } = dates;

        switch (direction) {
            case Directions.MINUS:
                dateTo = moment(firstDate);
                dateFrom = moment(firstDate).subtract(diff, "minutes");
                break;
            case Directions.PLUS:
                dateFrom = moment(lastDate);
                dateTo = moment(lastDate).add(diff, "minutes");
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
