const Queue = require("../src/structures/Queue");
const SingleNode = require("../src/models/SingleNode");

let Q = new Queue();

/**
 * Methods not being tested because they are already indirectly tested
 * enqueue, clear, size, toString
 */

describe("Queue", () => {
    describe("constructor", () => {
        it("should create an instance of Queue", () => {
            expect(Q).toBeInstanceOf(Queue);
        });
    });

    describe("peek", () => {
        it("should return the head value", () => {
            Q.enqueue(1);
            expect(Q.peek).not.toBeInstanceOf(SingleNode);
            expect(Q.peek).toBe(1);
        });
    });

    describe("dequeue", () => {
        beforeAll(() => {
            Q.dequeue();
        });

        it("should return null if there is nothing to dequeue", () => {
            expect(Q.dequeue()).toBeNull();
        });
    });

    describe("isEmpty", () => {
        it("should return true if the queue is empty", () => {
            expect(Q.isEmpty()).toBe(true);
        });
        it("should return false if the queue is not empty", () => {
            Q.enqueue(1);
            expect(Q.isEmpty()).toBe(false);
        });
    });

    describe("clone", () => {
        let cloneList;

        it("should clone the queue", () => {
            expect((cloneList = Q.clone())).toMatchObject(Q);
        });
        it("should not affect the original queue", () => {
            cloneList.dequeue();
            expect(cloneList.peek).toBeNull();
            expect(Q.peek).toBe(1);
        });
    });

    describe("toArray", () => {
        it("should return an array of values", () => {
            const array = Q.toArray();
            expect(array).not.toMatchObject([new SingleNode(1)]);
            expect(array).toMatchObject([1]);
        });
    });
});
