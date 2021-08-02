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

    /**
     * Skip the following as they are used internally
     * getLeftChildIndex
     * getRightChildIndex
     * getParentIndex
     * leftChild
     * rightChild
     * parent
     * compareByNode
     * compareByIndex
     * compareChildren
     * shouldSwap
     */

    describe("insert", () => {
        const insertNodes = [
            new HeapNode(642, 642),
            new HeapNode(834, 834),
            new HeapNode(166, 166),
        ];

        it("should throw a TypeError if a non HeapNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => MH.insert(fakeNode)).toThrow(TypeError);
        });
        it("should insert the HeapNodes into the heap", () => {
            MH.insert(insertNodes[0]);
            MH.insert(insertNodes[1]);
            MH.insert(insertNodes[2]);
            const find642 = MH.find((node) => node.key === 642);
            const find834 = MH.find((node) => node.key === 834);
            const find166 = MH.find((node) => node.key === 166);
            expect([find642, find834, find166]).toMatchObject(insertNodes);
        });
        it("should should set the root node as the largest given node", () => {
            expect(MH.root).toMatchObject(insertNodes[1]);
        });
    });

    /**
     * Skip the following as they are used internally
     * heapifyUp
     * heapifyDown
     */
});
