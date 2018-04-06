import {} from "jest";
import URLUtil from "../utils/URLUtil";

describe("URLUtil", () => {
    it("check if URL address is generated in correct format", () => {
        const generatedURL = URLUtil.generateURLByPosition("pressures", "latest");
        expect(generatedURL).toBe("pressures/latest");
    });
    it("check if it's returned original URL if one of dates is null", () => {
        const generatedURL = URLUtil.generateURLByDates("pressures", "2018-03-03");
        expect(generatedURL).toBe("pressures");
    });
    it("check if it's returned URL with start_date and end_date params", () => {
        const generatedURL = URLUtil.generateURLByDates("pressures", "2018-03-03", "2018-03-04");
        expect(generatedURL).toBe("pressures/?start_date=2018-03-03&end_date=2018-03-04");
    });
});
