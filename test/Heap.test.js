const Heap = require("../src/structures/Heap");

describe("Heap", () => {
    describe("constructor", () => {
        it("should throw an error if instantiated directly", () => {
            expect(() => new Heap()).toThrow(Error);
        });
    });
});
