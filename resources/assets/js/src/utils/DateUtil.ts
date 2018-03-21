import * as moment from "moment";

class DateUtil {
    public static formatDateByFormat(date: string, format: string): string {
        return moment(date).format(format);
    }
    public static areDatesNull(dateFrom: string, dateTo: string): boolean {
        return (dateFrom === null && dateTo === null);
    }
}

export default DateUtil;
