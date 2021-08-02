const Heap = require("../src/structures/Heap");
const MaxHeap = require("../src/structures/MaxHeap");
const HeapNode = require("../src/models/HeapNode");

const MH = new MaxHeap();

describe("MaxHeap", () => {
    describe("constructor", () => {
        it("should not throw an error when being instantiated directly", () => {
            expect(() => new MaxHeap()).not.toThrow(Error);
        });
        it("should create an instance of MaxHeap", () => {
            expect(MH).toBeInstanceOf(MaxHeap);
        });
        it("should set the nodes property to an empty array", () => {
            expect(MH.nodes).toStrictEqual([]);
        });
        it("should set the root property to null", () => {
            expect(MH.root).toBeNull();
        });
    });

    describe("get root", () => {
        it("should return the set HeapNode", () => {
            // New instance to not override existing root node
            const heap = new MaxHeap();
            const root = new HeapNode("root");
            heap.nodes[0] = root;
            expect(heap.root).toMatchObject(root);
        });
    });
});
