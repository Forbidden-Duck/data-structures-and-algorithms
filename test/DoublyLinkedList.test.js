const DoublyLinkedList = require("../src/structures/DoublyLinkedList");
const DoubleNode = require("../src/models/DoubleNode");

const DLL = new DoublyLinkedList();

describe("DoublyLinkedList", () => {
    describe("constructor", () => {
        it("should create an instance of DoublyLinkedList", () => {
            expect(DLL).toBeInstanceOf(DoublyLinkedList);
        });
        it("should set head property to null", () => {
            expect(DLL.head).toBeNull();
        });
        it("should set tail property to null", () => {
            expect(DLL.tail).toBeNull();
        });
    });

    describe("get head", () => {
        it("should return the set DoubleNode", () => {
            // Create a new DoublyLinkedList to not override head property on global DLL
            const list = new DoublyLinkedList();
            const head = new DoubleNode("head");
            list._head = head;
            expect(list._head).toBeInstanceOf(DoubleNode);
            expect(list._head).toMatchObject(head);
        });
    });

    describe("get tail", () => {
        it("should return the set DoubleNode", () => {
            // Create a new DoublyLinkedList to not override head property on global DLL
            const list = new DoublyLinkedList();
            const tail = new DoubleNode("tail");
            list._tail = tail;
            expect(list._tail).toBeInstanceOf(DoubleNode);
            expect(list._tail).toMatchObject(tail);
        });
    });

    describe("prepend", () => {
        const prependNode = new DoubleNode(1);

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.prepend(fakeNode)).toThrow(TypeError);
        });
        it("should prepend a DoubleNode to the head of the list", () => {
            const prepend = DLL.prepend(prependNode);
            expect(prepend).toBeInstanceOf(DoubleNode);
            expect(prepend).toMatchObject(prependNode);
        });
        it("should set the head node as the prepended node", () => {
            expect(DLL.head).toBeInstanceOf(DoubleNode);
            expect(DLL.head).toMatchObject(prependNode);
        });
    });

    describe("prepend array", () => {
        const prependNodes = [
            new DoubleNode(-2),
            new DoubleNode(-1),
            new DoubleNode(0),
        ];

        it("should throw a TypeError if one/some/all nodes are not a DoubleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => DLL.prepend(fakeNodes)).toThrow(TypeError);
        });
        it("should prepend all DoubleNodes to the head of the list", () => {
            const prepend = DLL.prepend(prependNodes);
            const node1 = DLL.head; // Should be the three nodes prepended
            const node2 = node1.next;
            const node3 = node2.next;
            // Check that they are instances of DoubleNode
            expect(node1).toBeInstanceOf(DoubleNode);
            expect(node2).toBeInstanceOf(DoubleNode);
            expect(node3).toBeInstanceOf(DoubleNode);
            // Check they match their respective nodes
            expect(node1).toMatchObject(prependNodes[0]);
            expect(node2).toMatchObject(prependNodes[1]);
            expect(node3).toMatchObject(prependNodes[2]);
        });
        it("should set the head node as the first node of the array", () => {
            expect(DLL.head).toBeInstanceOf(DoubleNode);
            expect(DLL.head).toMatchObject(prependNodes[0]);
        });
    });

    describe("append", () => {
        const appendNode = new DoubleNode(2);

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.append(fakeNode)).toThrow(TypeError);
        });
        it("should append a DoubleNode to the tail of the list", () => {
            const append = DLL.append(appendNode);
            expect(append).toBeInstanceOf(DoubleNode);
            expect(append).toMatchObject(appendNode);
        });
        it("should set the tail as the appended node", () => {
            expect(DLL.tail).toBeInstanceOf(DoubleNode);
            expect(DLL.tail).toMatchObject(appendNode);
        });
    });

    describe("insertBefore", () => {
        const insertBeforeNode = new DoubleNode(-3);

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.insertBefore(fakeNode, DLL._head)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeBefore is not an instance of DoubleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.insertBefore(insertBeforeNode, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert the node before the head node", () => {
            const insertBefore = DLL.insertBefore(insertBeforeNode, DLL._head);
            expect(insertBefore).toBeInstanceOf(DoubleNode);
            expect(insertBefore).toMatchObject(insertBeforeNode);
        });
        it("should set the head node as the inserted before node", () => {
            expect(DLL.head).toBeInstanceOf(DoubleNode);
            expect(DLL.head).toMatchObject(insertBeforeNode);
        });
    });

    describe("insertBefore array", () => {
        const insertBeforeNodes = [
            new DoubleNode(-6),
            new DoubleNode(-5),
            new DoubleNode(-4),
        ];

        it("should throw a TypeError if one/some/all nodes are not a DoubleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => DLL.insertBefore(fakeNodes, DLL._head)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeBefore is not an instance of DoubleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.insertBefore(insertBeforeNodes, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert all DoubleNodes before the head of the list", () => {
            const insertBefore = DLL.insertBefore(insertBeforeNodes, DLL._head);
            const node1 = DLL._head;
            const node2 = node1.next;
            const node3 = node2.next;
            // Check that they are instances of DoubleNode
            expect(node1).toBeInstanceOf(DoubleNode);
            expect(node2).toBeInstanceOf(DoubleNode);
            expect(node3).toBeInstanceOf(DoubleNode);
            // Check they match their respective nodes
            expect(node1).toMatchObject(insertBeforeNodes[0]);
            expect(node2).toMatchObject(insertBeforeNodes[1]);
            expect(node3).toMatchObject(insertBeforeNodes[2]);
        });
        it("should set the head node as the first node of the array", () => {
            expect(DLL.head).toBeInstanceOf(DoubleNode);
            expect(DLL.head).toMatchObject(insertBeforeNodes[0]);
        });
    });

    describe("insertAfter", () => {
        const insertAfterNode = new DoubleNode(6);

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.insertAfter(fakeNode, DLL._tail)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeAfter is not an instance of DoubleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.insertAfter(insertAfterNode, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert the node after the inserted after node", () => {
            const insertAfter = DLL.insertAfter(insertAfterNode, DLL._tail);
            expect(insertAfter).toBeInstanceOf(DoubleNode);
            expect(insertAfter).toMatchObject(insertAfterNode);
        });
        it("should set the tail node as the inserted after node", () => {
            expect(DLL.tail).toBeInstanceOf(DoubleNode);
            expect(DLL.tail).toMatchObject(insertAfterNode);
        });
    });

    describe("insertAfter array", () => {
        const insertAfterNodes = [
            new DoubleNode(7),
            new DoubleNode(8),
            new DoubleNode(9),
        ];

        it("should throw a TypeError if one/some/all nodes are not a DoubleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => DLL.insertAfter(fakeNodes, DLL._tail)).toThrow(
                TypeError
            );
        });
        it("should throw a TypeError if nodeAfter is not an instance of DoubleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.insertAfter(insertAfterNodes, fakeNode)).toThrow(
                TypeError
            );
        });
        it("should insert all DoubleNodes after the tail of the list", () => {
            const insertAfter = DLL.insertAfter(insertAfterNodes, DLL._tail);
            const node3 = DLL.tail; // Should be the three nodes appended
            const node2 = node3._previous;
            const node1 = node2._previous;
            // Check that they are instances of DoubleNode
            expect(node3).toBeInstanceOf(DoubleNode);
            expect(node2).toBeInstanceOf(DoubleNode);
            expect(node1).toBeInstanceOf(DoubleNode);
            // Check they match their respective nodes
            expect(node3).toMatchObject(insertAfterNodes[2]);
            expect(node2).toMatchObject(insertAfterNodes[1]);
            expect(node1).toMatchObject(insertAfterNodes[0]);
        });
        it("should set the tail node as the last node of the array", () => {
            expect(DLL.tail).toBeInstanceOf(DoubleNode);
            expect(DLL.tail).toMatchObject(insertAfterNodes[2]);
        });
    });

    describe("delete", () => {
        let deleteNode;

        beforeAll(() => {
            // Code in describe runs before the test starts
            deleteNode = DLL._tail;
        });

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.delete(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node from the tail of the list", () => {
            DLL.delete(deleteNode);
            expect(DLL.tail).not.toMatchObject(deleteNode);
            expect(DLL.find(deleteNode.data)).toBeNull();
        });
        it("should set the previous node as the new tail node", () => {
            expect(DLL.tail).toBeInstanceOf(DoubleNode);
        });
    });

    describe("delete array", () => {
        const deleteNodes = [
            // Make sure find doesn't accidentally find another node
            new DoubleNode(100),
            new DoubleNode(200),
            new DoubleNode(300),
        ];

        beforeAll(() => {
            DLL.prepend(deleteNodes);
        });

        it("should throw a TypeError if one/some/all nodes are not a DoubleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => DLL.delete(fakeNodes)).toThrow(TypeError);
        });
        it("should delete the nodes from the head of the list", () => {
            DLL.delete(deleteNodes);
            expect(DLL.head).not.toMatchObject(deleteNodes[0]);
            expect(DLL.find(deleteNodes[0].data)).toBeNull();
            expect(DLL.find(deleteNodes[1].data)).toBeNull();
            expect(DLL.find(deleteNodes[2].data)).toBeNull();
        });
        it("should set the next node as the new head node", () => {
            expect(DLL.head).toBeInstanceOf(DoubleNode);
        });
    });

    describe("deleteBefore", () => {
        let deleteBeforeNode;
        let nodeBeingDeleted;

        beforeAll(() => {
            deleteBeforeNode = DLL._tail;
            nodeBeingDeleted = deleteBeforeNode._previous;
        });

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.deleteBefore(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node before the given node", () => {
            DLL.deleteBefore(deleteBeforeNode);
            expect(DLL.tail).toMatchObject(deleteBeforeNode);
            expect(deleteBeforeNode._previous).not.toMatchObject(
                nodeBeingDeleted
            );
            expect(DLL.find(nodeBeingDeleted.data)).toBeNull();
        });
    });

    describe("deleteBefore array", () => {
        let deleteBeforeNodes;
        const nodesBeingDeleted = [new DoubleNode(100), new DoubleNode(200)];

        beforeAll(() => {
            deleteBeforeNodes = [DLL._head, DLL._tail];
            DLL.insertBefore(nodesBeingDeleted[0], deleteBeforeNodes[0]);
            DLL.insertBefore(nodesBeingDeleted[1], deleteBeforeNodes[1]);
        });

        it("should throw a TypeError if one/some/all nodes are not a DoubleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => DLL.deleteBefore(fakeNodes)).toThrow(TypeError);
        });
        it("should delete the nodes before the given nodes", () => {
            DLL.deleteBefore(deleteBeforeNodes);
            expect(DLL.head).toMatchObject(deleteBeforeNodes[0]);
            expect(DLL.tail).toMatchObject(deleteBeforeNodes[1]);
            expect(deleteBeforeNodes[0]._previous).toBeNull();
            expect(DLL.tail._previous).not.toMatchObject(deleteBeforeNodes[1]);
            expect(DLL.find(nodesBeingDeleted[0].data)).toBeNull();
            expect(DLL.find(nodesBeingDeleted[1].data)).toBeNull();
        });
    });

    describe("deleteAfter", () => {
        let deleteAfterNode;
        let nodeBeingDeleted;

        beforeAll(() => {
            deleteAfterNode = DLL.tail._previous;
            nodeBeingDeleted = DLL.tail;
        });

        it("should throw a TypeError if a non DoubleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => DLL.deleteAfter(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node after the given node", () => {
            DLL.deleteAfter(deleteAfterNode);
            expect(deleteAfterNode.next).toBeNull();
            expect(DLL.find(nodeBeingDeleted.data)).toBeNull();
        });
        it("should set the tail as the node before the deleted node", () => {
            expect(DLL.tail).toBeInstanceOf(DoubleNode);
            expect(DLL.tail).toMatchObject(deleteAfterNode);
        });
    });

    describe("deleteAfter array", () => {
        let deleteAfterNodes;
        const nodesBeingDeleted = [new DoubleNode(100), new DoubleNode(200)];

        beforeAll(() => {
            deleteAfterNodes = [DLL._head, DLL._tail];
            DLL.insertAfter(nodesBeingDeleted[0], deleteAfterNodes[0]);
            DLL.insertAfter(nodesBeingDeleted[1], deleteAfterNodes[1]);
        });

        it("should throw a TypeError if one/some/all nodes are not a DoubleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => DLL.deleteAfter(fakeNodes)).toThrow(TypeError);
        });
        it("should delete the nodes after the given nodes", () => {
            DLL.deleteAfter(deleteAfterNodes);
            expect(DLL.head).toMatchObject(deleteAfterNodes[0]);
            expect(DLL.tail).toMatchObject(deleteAfterNodes[1]);
            expect(deleteAfterNodes[0].next).not.toMatchObject(
                nodesBeingDeleted[0]
            );
            expect(deleteAfterNodes[1].next).toBeNull();
            expect(DLL.find(nodesBeingDeleted[0].data)).toBeNull();
            expect(DLL.find(nodesBeingDeleted[1].data)).toBeNull();
        });
    });

    describe("clear", () => {
        const clonedList = DLL.clone();

        it("should delete all nodes in the list", () => {
            clonedList.clear();
            expect(clonedList.head).toBeNull();
            expect(clonedList.tail).toBeNull();
        });
    });

    describe("get", () => {
        it("should throw a TypeError if the value entered is not a number", () => {
            expect(() => DLL.get(NaN)).toThrow(TypeError);
        });
        it("should respond with the node at the index provided", () => {
            const getHeadNode = DLL.get(0);
            const getTailNode = DLL.get(DLL.size - 1);
            expect(getHeadNode).toMatchObject(DLL.head);
            expect(getTailNode).toMatchObject(DLL.tail);
        });
    });

    describe("find", () => {
        it("should return null if no node is found", () => {
            const findNode = DLL.find("this is a non existent node");
            expect(findNode).toBeNull();
        });
        it("should respond with the node with the data provided", () => {
            const findHeadNode = DLL.find(DLL.head.data);
            const findTailNode = DLL.find(DLL.tail.data);
            expect(findHeadNode).toMatchObject(DLL.head);
            expect(findTailNode).toMatchObject(DLL.tail);
        });
    });

    describe("forEach", () => {
        it("should throw a TypeError if the callback function is not a function", () => {
            expect(() => DLL.forEach()).toThrow(TypeError);
        });
        it("should loop through all the nodes in the list", () => {
            let focusedNode = DLL.head;
            DLL.forEach((node, list) => {
                expect(node).toMatchObject(focusedNode);
                expect(list).toMatchObject(DLL);
                focusedNode = focusedNode.next;
            });
        });
        it("should bind thisArg to the function", () => {
            let forEachBind;
            DLL.forEach(function () {
                forEachBind = this;
            }, DLL.head);
            expect(forEachBind).toMatchObject(DLL.head);
        });
    });

    describe("filter", () => {
        it("should throw a TypeError if the callback function is not a function", () => {
            expect(() => DLL.filter()).toThrow(TypeError);
        });
        it("should loop through all the nodes in the list", () => {
            let focusedNode = DLL.head;
            DLL.filter((node, list) => {
                expect(node).toMatchObject(focusedNode);
                expect(list).toMatchObject(DLL);
                focusedNode = focusedNode.next;
            });
        });
        it("should bind thisArg to the function", () => {
            let filterBind;
            DLL.filter(function () {
                filterBind = this;
            }, DLL.head);
            expect(filterBind).toMatchObject(DLL.head);
        });
        it("should remove nodes that don't pass the filter", () => {
            const expectedList = DLL.clone();
            expectedList.delete(expectedList.head);
            const filterList = DLL.filter((node) => {
                if (!DoubleNode.compareInstance(node, DLL.head)) {
                    return true;
                }
            });
            expect(filterList).toMatchObject(expectedList);
        });
    });

    describe("clone", () => {
        let cloneList;

        it("should clone the list", () => {
            expect((clonelist = DLL.clone())).toMatchObject(DLL);
        });
        it("should not affect the original list", () => {
            clonelist.get(0).data = "bad";
            expect(clonelist.get(0).data).toStrictEqual("bad");
            expect(DLL.get(0).data).not.toStrictEqual("bad");
        });
    });

    describe("size", () => {
        it("should return the size of the list", () => {
            const list = new DoublyLinkedList();
            list.append(new DoubleNode(1));
            expect(list.size).toBe(1);
        });
    });

    describe("toArray", () => {
        it("should return an array of the nodes", () => {
            const list = new DoublyLinkedList();
            list.append(new DoubleNode(1));
            expect(list.toArray()).toMatchObject([new DoubleNode(1)]);
        });
    });

    describe("toString", () => {
        it("should return a string representation of the list", () => {
            const list = new DoublyLinkedList();
            list.append(new DoubleNode(1));
            list.append(new DoubleNode(2));
            expect(list.toString()).toStrictEqual("1 -> 2");
        });
    });

    describe("toStringReverse", () => {
        it("should return a string representation of the list in reverse", () => {
            const list = new DoublyLinkedList();
            list.append(new DoubleNode(1));
            list.append(new DoubleNode(2));
            expect(list.toStringReverse()).toStrictEqual("2 <- 1");
        });
    });
});
