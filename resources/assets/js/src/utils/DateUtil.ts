import * as moment from "moment";

class DateUtil {
    public static formatDateByFormat(date: string, format: string): string {
        return moment(date).format(format);
    }
}

export default DateUtil;
