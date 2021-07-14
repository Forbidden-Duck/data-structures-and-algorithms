const SinglyLinkedList = require("../src/structures/SinglyLinkedList");
const SingleNode = require("../src/models/SingleNode");

let SLL = new SinglyLinkedList();

describe("SinglyLinkedList", () => {
    describe("constructor", () => {
        it("should create an instance of SinglyLinkedList", () => {
            expect(SLL).toBeInstanceOf(SinglyLinkedList);
        });
        it("should set head property to null", () => {
            expect(SLL.head).toBeNull();
        });
        it("should set tail property to null", () => {
            expect(SLL.tail).toBeNull();
        });
    });

    describe("get head", () => {
        it("should return the set SingleNode", () => {
            // Create a new SinglyLinkedList to not override head property on global SLL
            const list = new SinglyLinkedList();
            const head = new SingleNode("head");
            list._head = head;
            expect(list._head).toBeInstanceOf(SingleNode);
            expect(list._head).toMatchObject(head);
        });
    });

    describe("get tail", () => {
        it("should return the set SingleNode", () => {
            // Create a new SinglyLinkedList to not override head property on global SLL
            const list = new SinglyLinkedList();
            const tail = new SingleNode("tail");
            list._tail = tail;
            expect(list._tail).toBeInstanceOf(SingleNode);
            expect(list._tail).toMatchObject(tail);
        });
    });

    describe("prepend", () => {
        const prependNode = new SingleNode(1);

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.prepend(fakeNode)).toThrow(TypeError);
        });
        it("should prepend a SingleNode to the head of the list", () => {
            const prepend = SLL.prepend(prependNode);
            expect(prepend).toBeInstanceOf(SingleNode);
            expect(prepend).toMatchObject(prependNode);
        });
        it("should set the head node as the prepended node", () => {
            expect(SLL.head).toBeInstanceOf(SingleNode);
            expect(SLL.head).toMatchObject(prependNode);
        });
    });

    describe("prepend array", () => {
        const prependNodes = [
            new SingleNode(-2),
            new SingleNode(-1),
            new SingleNode(0),
        ];

        it("should throw a TypeError if one/some/all nodes are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.prepend(fakeNodes)).toThrow(TypeError);
        });
        it("should prepend all SingleNodes to the head of the list", () => {
            const prepend = SLL.prepend(prependNodes);
            const node1 = SLL.head; // Should be the three nodes prepended
            const node2 = node1.next;
            const node3 = node2.next;
            // Check that they are instances of SingleNode
            expect(node1).toBeInstanceOf(SingleNode);
            expect(node2).toBeInstanceOf(SingleNode);
            expect(node3).toBeInstanceOf(SingleNode);
            // Check they match their respective nodes
            expect(node1).toMatchObject(prependNodes[0]);
            expect(node2).toMatchObject(prependNodes[1]);
            expect(node3).toMatchObject(prependNodes[2]);
        });
        it("should set the head node as the first node of the array", () => {
            expect(SLL.head).toBeInstanceOf(SingleNode);
            expect(SLL.head).toMatchObject(prependNodes[0]);
        });
    });

    describe("append", () => {
        const appendNode = new SingleNode(2);

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.append(fakeNode)).toThrow(TypeError);
        });
        it("should append a SingleNode to the tail of the list", () => {
            const append = SLL.append(appendNode);
            expect(append).toBeInstanceOf(SingleNode);
            expect(append).toMatchObject(appendNode);
        });
        it("should set the tail as the appended node", () => {
            expect(SLL.tail).toBeInstanceOf(SingleNode);
            expect(SLL.tail).toMatchObject(appendNode);
        });
    });

    describe("append array", () => {
        const appendNodes = [
            new SingleNode(3),
            new SingleNode(4),
            new SingleNode(5),
        ];

        it("should throw a TypeError if a one/some/all are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.append(fakeNodes)).toThrow(TypeError);
        });
        it("should append all nodes to the tail of the list", () => {
            const append = SLL.append(appendNodes);
            const node3 = SLL.tail; // Should be the three nodes appended
            const node2 = SLL.getNodeBefore(node3);
            const node1 = SLL.getNodeBefore(node2);
            // Check that they are instances of SingleNode
            expect(node3).toBeInstanceOf(SingleNode);
            expect(node2).toBeInstanceOf(SingleNode);
            expect(node1).toBeInstanceOf(SingleNode);
            // Check they match their respective nodes
            expect(node3).toMatchObject(appendNodes[2]);
            expect(node2).toMatchObject(appendNodes[1]);
            expect(node1).toMatchObject(appendNodes[0]);
        });
        it("should set the tail node as the last node of the array", () => {
            expect(SLL.tail).toBeInstanceOf(SingleNode);
            expect(SLL.tail).toMatchObject(appendNodes[2]);
        });
    });

    describe("insertBefore", () => {
        const insertBeforeNode = new SingleNode(-3);

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.insertBefore(fakeNode, SLL._head)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeBefore is not an instance of SingleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.insertBefore(insertBeforeNode, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert the node before the head node", () => {
            const insertBefore = SLL.insertBefore(insertBeforeNode, SLL._head);
            expect(insertBefore).toBeInstanceOf(SingleNode);
            expect(insertBefore).toMatchObject(insertBeforeNode);
        });
        it("should set the head node as the inserted before node", () => {
            expect(SLL.head).toBeInstanceOf(SingleNode);
            expect(SLL.head).toMatchObject(insertBeforeNode);
        });
    });

    describe("insertBefore array", () => {
        const insertBeforeNodes = [
            new SingleNode(-6),
            new SingleNode(-5),
            new SingleNode(-4),
        ];

        it("should throw a TypeError if one/some/all nodes are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.insertBefore(fakeNodes, SLL._head)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeBefore is not an instance of SingleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.insertBefore(insertBeforeNodes, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert all SingleNodes before the head of the list", () => {
            const insertBefore = SLL.insertBefore(insertBeforeNodes, SLL._head);
            const node1 = SLL._head;
            const node2 = node1.next;
            const node3 = node2.next;
            // Check that they are instances of SingleNode
            expect(node1).toBeInstanceOf(SingleNode);
            expect(node2).toBeInstanceOf(SingleNode);
            expect(node3).toBeInstanceOf(SingleNode);
            // Check they match their respective nodes
            expect(node1).toMatchObject(insertBeforeNodes[0]);
            expect(node2).toMatchObject(insertBeforeNodes[1]);
            expect(node3).toMatchObject(insertBeforeNodes[2]);
        });
        it("should set the head node as the first node of the array", () => {
            expect(SLL.head).toBeInstanceOf(SingleNode);
            expect(SLL.head).toMatchObject(insertBeforeNodes[0]);
        });
    });

    describe("insertAfter", () => {
        const insertAfterNode = new SingleNode(6);

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.insertAfter(fakeNode, SLL._tail)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeAfter is not an instance of SingleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.insertAfter(insertAfterNode, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert the node after the inserted after node", () => {
            const insertAfter = SLL.insertAfter(insertAfterNode, SLL._tail);
            expect(insertAfter).toBeInstanceOf(SingleNode);
            expect(insertAfter).toMatchObject(insertAfterNode);
        });
        it("should set the tail node as the inserted after node", () => {
            expect(SLL.tail).toBeInstanceOf(SingleNode);
            expect(SLL.tail).toMatchObject(insertAfterNode);
        });
    });

    describe("insertAfter array", () => {
        const insertAfterNodes = [
            new SingleNode(7),
            new SingleNode(8),
            new SingleNode(9),
        ];

        it("should throw a TypeError if one/some/all nodes are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.insertAfter(fakeNodes, SLL._tail)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeAfter is not an instance of SingleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.insertAfter(insertAfterNodes, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert all SingleNodes after the tail of the list", () => {
            const insertAfter = SLL.insertAfter(insertAfterNodes, SLL._tail);
            const node3 = SLL.tail; // Should be the three nodes appended
            const node2 = SLL.getNodeBefore(node3);
            const node1 = SLL.getNodeBefore(node2);
            // Check that they are instances of SingleNode
            expect(node3).toBeInstanceOf(SingleNode);
            expect(node2).toBeInstanceOf(SingleNode);
            expect(node1).toBeInstanceOf(SingleNode);
            // Check they match their respective nodes
            expect(node3).toMatchObject(insertAfterNodes[2]);
            expect(node2).toMatchObject(insertAfterNodes[1]);
            expect(node1).toMatchObject(insertAfterNodes[0]);
        });
        it("should set the tail node as the last node of the array", () => {
            expect(SLL.tail).toBeInstanceOf(SingleNode);
            expect(SLL.tail).toMatchObject(insertAfterNodes[2]);
        });
    });
});
