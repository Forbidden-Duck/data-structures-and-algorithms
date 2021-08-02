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
            new HeapNode(804, 804),
            new HeapNode(638, 638),
            new HeapNode(744, 744),
        ];

        it("should throw a TypeError if a non HeapNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => MH.insert(fakeNode)).toThrow(TypeError);
        });
        it("should insert the HeapNodes into the heap", () => {
            MH.insert(insertNodes[0]);
            MH.insert(insertNodes[1]);
            MH.insert(insertNodes[2]);
            MH.insert(insertNodes[3]);
            MH.insert(insertNodes[4]);
            MH.insert(insertNodes[5]);
            const find642 = MH.find((node) => node.key === 642);
            const find834 = MH.find((node) => node.key === 834);
            const find166 = MH.find((node) => node.key === 166);
            const find804 = MH.find((node) => node.key === 804);
            const find638 = MH.find((node) => node.key === 638);
            const find744 = MH.find((node) => node.key === 744);
            expect([
                find642,
                find834,
                find166,
                find804,
                find638,
                find744,
            ]).toMatchObject(insertNodes);
        });
        it("should should set the root node as the largest given node", () => {
            expect(MH.root).toMatchObject(insertNodes[1]);
        });
    });

    describe("delete", () => {
        let deleteNote;

        beforeAll(() => {
            // Make sure deleteNode does not mutate the MaxHeap root
            deleteNode = new HeapNode(MH.root.key, MH.root.data);
        });

        it("should throw a TypeError if a non Heap is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => MH.deleteNode(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node from the heap", () => {
            MH.delete(deleteNode);
            expect(MH.root).not.toMatchObject(deleteNode);
            expect(MH.find((node) => node.key === deleteNode.key)).toBeNull();
        });
    });

    describe("clear", () => {
        const clonedHeap = MH.clone();

        it("should clone all nodes in the heap", () => {
            clonedHeap.clear();
            expect(clonedHeap.root).toBeNull();
            expect(clonedHeap.nodes).toStrictEqual([]);
            expect(clonedHeap.size).toBe(0);
        });
    });

    describe("get", () => {
        it("should throw a TypeError if the index entered is not a number", () => {
            expect(() => MH.get(NaN)).toThrow(TypeError);
        });
        it("should respond with null if a non-existent node is provided", () => {
            expect(MH.get(999999)).toBeNull();
        });
        it("should respond with the node associated with the given index", () => {
            const rootNode = MH.get(0);
            expect(rootNode).toMatchObject(MH.root);
        });
    });

    /**
     * Skip the following as they are used internally
     * heapifyUp
     * heapifyDown
     */
});
