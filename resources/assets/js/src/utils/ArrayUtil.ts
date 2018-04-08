import * as Directions from "../config/constants/directions";

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
}

export default ArrayUtil;
