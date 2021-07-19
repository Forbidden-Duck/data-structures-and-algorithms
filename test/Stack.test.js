const Stack = require("../src/structures/Stack");
const SingleNode = require("../src/models/SingleNode");

let S = new Stack();

/**
 * Methods not being tested because they are already indirectly tested
 * Push, clear, size, toString
 */

describe("Stack", () => {
    describe("constructor", () => {
        it("should create an instance of Stack", () => {
            expect(S).toBeInstanceOf(Stack);
        });
    });

    describe("peek", () => {
        it("should return the head value", () => {
            S.push(1);
            expect(S.peek).not.toBeInstanceOf(SingleNode);
            expect(S.peek).toBe(1);
        });
    });

    describe("pop", () => {
        beforeAll(() => {
            S.pop();
        });

        it("should return null if there is nothing to dequeue", () => {
            expect(S.pop()).toBeNull();
        });
    });

    describe("isEmpty", () => {
        it("should return true if the stack is empty", () => {
            expect(S.isEmpty()).toBe(true);
        });
        it("should return false if the stack is not empty", () => {
            S.push(1);
            expect(S.isEmpty()).toBe(false);
        });
    });

    describe("clone", () => {
        let cloneList;

        it("should clone the stack", () => {
            expect((cloneList = S.clone())).toMatchObject(S);
        });
        it("should not affect the original stack", () => {
            cloneList.pop();
            expect(cloneList.peek).toBeNull();
            expect(S.peek).toBe(1);
        });
    });

    describe("toArray", () => {
        it("should return an array of values", () => {
            const array = S.toArray();
            expect(array).not.toMatchObject([new SingleNode(1)]);
            expect(array).toMatchObject([1]);
        });
    });
});
