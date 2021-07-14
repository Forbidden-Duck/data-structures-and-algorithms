const SingleNode = require("../src/models/SingleNode");

describe("SingleNode", () => {
  describe("constructor", () => {
    it("should create an instance of SingleNode", () => {
      const node = new SingleNode();
      expect(node).toBeInstanceOf(SingleNode);
    });
    it("should add data to its properties", () => {
      const data = "my data";
      const node = new SingleNode(data);
      expect(node.data).toStrictEqual(data);
    });
    it("should set next property as null", () => {
      const node = new SingleNode();
      expect(node.next).toBeNull();
    });
  });

  describe("get next", () => {
    it("should return the set SingleNode", () => {
      const node = new SingleNode(1);
      const nextNode = new SingleNode(2);
      node._next = nextNode;
      expect(node.next).toBeInstanceOf(SingleNode);
      expect(node.next).toMatchObject(nextNode);
    });
  });

  describe("compareInstance", () => {
    it("should return null if node1 is not an instance of SingleNode", () => {
      const node1 = { data: "Not a SingleNode" };
      const node2 = new SingleNode("Not a SingleNode"); // Match the data
      expect(SingleNode.compareInstance(node1, node2)).toBeNull();
    });
    it("should return null if node2 is not an instance of SingleNode", () => {
      const node1 = new SingleNode("Not a SingleNode"); // Match the data
      const node2 = { data: "Not a SingleNode" };
      expect(SingleNode.compareInstance(node1, node2)).toBeNull();
    });
    it("should return null if node1 & node2 is not an instance of SingleNode", () => {
      const node1 = { data: "Not a SingleNode" };
      const node2 = { data: "Not a SingleNode" };
      expect(SingleNode.compareInstance(node1, node2)).toBeNull();
    });
    it("should return true if two of the same instances are present", () => {
      const node = new SingleNode(1);
      expect(SingleNode.compareInstance(node, node)).toBe(true);
    });
    it("should return true if two instances have the same data", () => {
      const node1 = new SingleNode(1);
      const node2 = new SingleNode(1);
      expect(SingleNode.compareInstance(node1, node2)).toBe(true);
    });
    it("should return false if two instances have different data", () => {
      const node1 = new SingleNode(1);
      const node2 = new SingleNode(2);
      expect(SingleNode.compareInstance(node1, node2)).toBe(false);
    });
    it("should return true if two instances have the same next and data", () => {
      const node1 = new SingleNode(1);
      const node1Next = new SingleNode(2);
      node1._next = node1Next;
      const node2 = new SingleNode(1);
      const node2Next = new SingleNode(2);
      node2._next = node2Next;
      expect(SingleNode.compareInstance(node1, node2)).toBe(true);
    });
    it("should return false if two instances have same next but different data", () => {
      const node1 = new SingleNode(1);
      const node1Next = new SingleNode(2);
      node1._next = node1Next;
      const node2 = new SingleNode(2);
      const node2Next = new SingleNode(2);
      node2._next = node2Next;
      expect(SingleNode.compareInstance(node1, node2)).toBe(false);
    });
    it("should return false if two instances have different next but same data", () => {
      const node1 = new SingleNode(1);
      const node1Next = new SingleNode(2);
      node1._next = node1Next;
      const node2 = new SingleNode(1);
      const node2Next = new SingleNode(1);
      node2._next = node2Next;
      expect(SingleNode.compareInstance(node1, node2)).toBe(false);
    });
  });
});
