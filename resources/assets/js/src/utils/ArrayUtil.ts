class ArrayUtil {
    public static removeDuplicities(array: any): any {
        return array.filter((elem, index, self) => {
            return self.findIndex((t) => {
                return (t.date === elem.date && t.value === elem.value);
            }) === index;
        });
    }
}

export default ArrayUtil;
