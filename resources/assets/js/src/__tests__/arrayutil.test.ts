import {} from "jest";
import * as Directions from "../config/constants/directions";
import ArrayUtil from "../utils/ArrayUtil";

describe("ArrayUtil", () => {
    it("check if array doesn't contain duplicities", () => {
        let testArray = [
            { date: "2018-03-25", value: 20 },
            { date: "2018-03-25", value: 20 },
            { date: "2018-03-26", value: 21 },
        ];
        testArray = ArrayUtil.removeDuplicities(testArray);
        const expectedArray = [
            { date: "2018-03-25", value: 20 },
            { date: "2018-03-26", value: 21 },
        ];
        expect(testArray).toEqual(expectedArray);
    });
    it("check if returned array is combination of firstArray and secondArray", () => {
        const firstArray = ["a"];
        const secondArray = ["b"];
        const destructuredArray = ArrayUtil.destructureDataArrays(Directions.PLUS, firstArray, secondArray);
        expect(destructuredArray).toEqual(["a", "b"]);
    });
});
