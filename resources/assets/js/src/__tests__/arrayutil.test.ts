import * as Directions from "config/constants/directions";
import * as Values from "config/constants/values";
import {} from "jest";
import ArrayUtil from "utils/ArrayUtil";

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
        const testArray = [];
        for (let i = 0; i < 20; i++) {
            testArray.push({ date: "2018-03-25", value: i });
        }
        const downSampledArray = ArrayUtil.downSampleArray(testArray);
        expect(downSampledArray.length).toBe(testArray.length);
    });
    it("check if downSampled array has length given by NUMBER_OF_SAMPLES constant", () => {
        const testArray = [];
        for (let i = 0; i < 50; i++) {
            testArray.push({ date: "2018-03-25", value: i });
        }
        const downSampledArray = ArrayUtil.downSampleArray(testArray);
        expect(downSampledArray.length).toBe(Values.NUMBER_OF_SAMPLES);
    });
});
