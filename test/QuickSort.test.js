const QuickSort = require("../src/sorting/QuickSort");
const HeapNode = require("../src/models/HeapNode");
const arrayToSort = [
    new HeapNode(5449, "5449"),
    new HeapNode(8609, "8609"),
    new HeapNode(7621, "7621"),
    new HeapNode(2399, "2399"),
    new HeapNode(7777, "7777"),
    new HeapNode(5779, "5779"),
    new HeapNode(2713, "2713"),
    new HeapNode(5119, "5119"),
    new HeapNode(6291, "6291"),
    new HeapNode(2556, "2556"),
];
const sortedArray = [
    new HeapNode(2399, "2399"),
    new HeapNode(2556, "2556"),
    new HeapNode(2713, "2713"),
    new HeapNode(5119, "5119"),
    new HeapNode(5449, "5449"),
    new HeapNode(5779, "5779"),
    new HeapNode(6291, "6291"),
    new HeapNode(7621, "7621"),
    new HeapNode(7777, "7777"),
    new HeapNode(8609, "8609"),
];

describe("QuickSort", () => {
    it("should return the array sorted", () => {
        const sort = QuickSort(arrayToSort, HeapNode);
        expect(sort).toStrictEqual(sortedArray);
    });
    it("should not affect the original array", () => {
        const sort = QuickSort(arrayToSort, HeapNode);
        sort[0].data = "bad";
        expect(sort[0].data).toStrictEqual("bad");
        expect(
            sortedArray.find((node) => node.key === sort[0].key).data
        ).not.toStrictEqual("bad");
    });
});
