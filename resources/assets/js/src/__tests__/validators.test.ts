/// <reference types="jest" />
import * as validators from "config/validators";

describe("Validators", () => {
    it("check if required validator returns error text for missing value", () => {
        expect(validators.required("")).toBe("This value is required.");
    });
    it("check if required validator doesn't return error for filled value", () => {
        expect(validators.required("text")).toBeNull();
    });
    it("check if e-mail validator returns error text for non-email value", () => {
        expect(validators.email("thisIsNotEmail")).toBe("thisIsNotEmail is not e-mail address.");
    });
    it("check if e-mail validator doesn't return error for e-mail value", () => {
        expect(validators.email("this.is@email.com")).toBeNull();
    });
});
