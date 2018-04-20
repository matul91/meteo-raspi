import * as Directions from "config/constants/directions";
import * as Values from "config/constants/values";
import {} from "jest";
import ArrayUtil from "utils/ArrayUtil";

function generateTestArray(numOfElements: number): object[] {
    const testArray = [];

    for (let i = 0; i < numOfElements; i++) {
        testArray.push({ date: "2018-03-25", value: i });
    }

    return testArray;
}

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
    it("check if array that has less elements than NUMBER_OF_SAMPLES constant has original length", () => {
        const smallerTestArray = generateTestArray(20);
        const equalLengthArray = ArrayUtil.downSampleArray(smallerTestArray);
        expect(equalLengthArray.length).toBe(smallerTestArray.length);
    });
    it("check if returned array has length given by NUMBER_OF_SAMPLES constant", () => {
        const biggerTestArray = generateTestArray(50);
        const maxLengthArray = ArrayUtil.downSampleArray(biggerTestArray);
        expect(maxLengthArray.length).toBe(Values.NUMBER_OF_SAMPLES);
    });
});
