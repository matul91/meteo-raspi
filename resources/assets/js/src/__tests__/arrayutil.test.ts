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
    it("check if downSampled array that has less elements than NUMBER_OF_SAMPLES constant has original length", () => {
        const testArray = generateTestArray(20);
        const downSampledArray = ArrayUtil.downSampleArray(testArray);
        expect(downSampledArray.length).toBe(testArray.length);
    });
    it("check if downSampled array has length given by NUMBER_OF_SAMPLES constant", () => {
        const testArray = generateTestArray(50);
        const downSampledArray = ArrayUtil.downSampleArray(testArray);
        expect(downSampledArray.length).toBe(Values.NUMBER_OF_SAMPLES);
    });
});
