const HashMap = require("../src/structures/HashMap");
const SingleNode = require("../src/models/SingleNode");

describe("HashMap", () => {
    describe("constructor", () => {
        it("should create an instance of HashMap", () => {
            expect(new HashMap()).toBeInstanceOf(HashMap);
        });
        it("should set the default size to 32", () => {
            expect(new HashMap().buckets.length).toBe(32);
        });
        it("should set the size of the HashMap", () => {
            expect(new HashMap(64).buckets.length).toBe(64);
        });
    });

    describe("keys", () => {
        it("should return an array of keys", () => {
            const HM = new HashMap();
            HM._keys = { One: 1, Two: 2, Three: 3 };
            expect(HM.keys).toEqual(["One", "Two", "Three"]);
        });
    });

    describe("hashes", () => {
        it("should return an array of hashes", () => {
            const HM = new HashMap();
            HM._keys = { One: 1, Two: 2, Three: 3 };
            expect(HM.hashes).toEqual([1, 2, 3]);
        });
    });

    describe("values", () => {
        it("should return an array of all the values", () => {
            const HM = new HashMap();
            HM.set("One", 1);
            HM.set("Two", 2);
            HM.set("Three", 3);
            expect(HM.values).toEqual([1, 2, 3]);
        });
    });

    describe("hash", () => {
        it("should return a number representing the hash", () => {
            expect(typeof new HashMap().hash("string")).toEqual("number");
        });
    });

    describe("has", () => {
        it("should return true if the key exists", () => {
            const HM = new HashMap();
            HM._keys = { One: 1, Two: 2, Three: 3 };
            expect(HM.has("One")).toBe(true);
        });
        it("should return false if the key does not exist", () => {
            expect(new HashMap().has("One")).toBe(false);
        });
    });

    describe("get & set", () => {
        it("should set the key and value", () => {
            const HM = new HashMap();
            HM.set("One", 1);
            HM.set("Two", 2);
            expect(HM.get("One")).toBe(1);
        });
        it("should return undefined if the key does not exist", () => {
            expect(new HashMap().get("One")).toBeUndefined();
        });
    });

    describe("delete", () => {
        it("should delete the key and value", () => {
            const HM = new HashMap();
            HM.set("One", 1);
            HM.set("Two", 2);
            HM.delete("One");
            expect(HM.get("One")).toBeUndefined();
        });
    });
});
