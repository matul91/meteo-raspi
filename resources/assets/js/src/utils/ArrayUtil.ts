import * as DateFormats from "config/constants/dateFormats";
import * as Directions from "config/constants/directions";
import * as Values from "config/constants/values";
import * as downSampler from "downsample-lttb";
import * as moment from "moment";

class ArrayUtil {
    public static removeDuplicities(array: any): any {
        return array.filter((element, index, self) => {
            return self.findIndex((t) => {
                return (t.date === element.date && t.value === element.value);
            }) === index;
        });
    }

    public static destructureDataArrays(direction, data, newData): any {
        return (direction === Directions.PLUS) ? [...data, ...newData] : [...newData, ...data];
    }

    public static downSampleArray(data): any {
        const dataPairs = data.map((element) => {
            return [moment(element.date).valueOf(), element.value];
        });
        return downSampler.processData(dataPairs, Values.NUMBER_OF_SAMPLES).map((element) => {
            return {
                date: moment(element[0]).format(DateFormats.DB_DATE_FORMAT),
                value: element[1],
            };
        });
    }
}

export default ArrayUtil;
