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

    describe("delete", () => {
        let deleteNode;

        beforeAll(() => {
            // Code in describe runs before the test starts
            deleteNode = SLL._tail;
        });

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.delete(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node from the tail of the list", () => {
            SLL.delete(deleteNode);
            expect(SLL.tail).not.toMatchObject(deleteNode);
            expect(SLL.find(deleteNode.data)).toBeNull();
        });
        it("should set the previous node as the new tail node", () => {
            expect(SLL.tail).toBeInstanceOf(SingleNode);
        });
    });

    describe("delete array", () => {
        const deleteNodes = [
            // Make sure find doesn't accidentally find another node
            new SingleNode(100),
            new SingleNode(200),
            new SingleNode(300),
        ];

        beforeAll(() => {
            SLL.prepend(deleteNodes);
        });

        it("should throw a TypeError if one/some/all nodes are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.delete(fakeNodes)).toThrow(TypeError);
        });
        it("should delete the nodes from the head of the list", () => {
            SLL.delete(deleteNodes);
            expect(SLL.head).not.toMatchObject(deleteNodes[0]);
            expect(SLL.find(deleteNodes[0].data)).toBeNull();
            expect(SLL.find(deleteNodes[1].data)).toBeNull();
            expect(SLL.find(deleteNodes[2].data)).toBeNull();
        });
        it("should set the next node as the new head node", () => {
            expect(SLL.head).toBeInstanceOf(SingleNode);
        });
    });

    describe("deleteBefore", () => {
        let deleteBeforeNode;
        let nodeBeingDeleted;

        beforeAll(() => {
            deleteBeforeNode = SLL._tail;
            nodeBeingDeleted = SLL.getNodeBefore(deleteBeforeNode);
        });

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.deleteBefore(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node before the given node", () => {
            SLL.deleteBefore(deleteBeforeNode);
            expect(SLL.tail).toMatchObject(deleteBeforeNode);
            expect(SLL.getNodeBefore(deleteBeforeNode)).not.toMatchObject(
                nodeBeingDeleted
            );
            expect(SLL.find(nodeBeingDeleted.data)).toBeNull();
        });
    });

    describe("deleteBefore array", () => {
        let deleteBeforeNodes;
        const nodesBeingDeleted = [new SingleNode(100), new SingleNode(200)];

        beforeAll(() => {
            deleteBeforeNodes = [SLL._head, SLL._tail];
            SLL.insertBefore(nodesBeingDeleted[0], deleteBeforeNodes[0]);
            SLL.insertBefore(nodesBeingDeleted[1], deleteBeforeNodes[1]);
        });

        it("should throw a TypeError if one/some/all nodes are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.deleteBefore(fakeNodes)).toThrow(TypeError);
        });
        it("should delete the nodes before the given nodes", () => {
            SLL.deleteBefore(deleteBeforeNodes);
            expect(SLL.head).toMatchObject(deleteBeforeNodes[0]);
            expect(SLL.tail).toMatchObject(deleteBeforeNodes[1]);
            expect(SLL.getNodeBefore(deleteBeforeNodes[0])).toBeNull();
            expect(SLL.getNodeBefore(SLL.tail)).not.toMatchObject(
                deleteBeforeNodes[1]
            );
            expect(SLL.find(nodesBeingDeleted[0].data)).toBeNull();
            expect(SLL.find(nodesBeingDeleted[1].data)).toBeNull();
        });
    });

    describe("deleteAfter", () => {
        let deleteAfterNode;
        let nodeBeingDeleted;

        beforeAll(() => {
            deleteAfterNode = SLL.getNodeBefore(SLL.tail);
            nodeBeingDeleted = SLL.tail;
        });

        it("should throw a TypeError if a non SingleNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.deleteAfter(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node after the given node", () => {
            SLL.deleteAfter(deleteAfterNode);
            expect(deleteAfterNode.next).toBeNull();
            expect(SLL.find(nodeBeingDeleted.data)).toBeNull();
        });
        it("should set the tail as the node before the deleted node", () => {
            expect(SLL.tail).toBeInstanceOf(SingleNode);
            expect(SLL.tail).toMatchObject(deleteAfterNode);
        });
    });

    describe("deleteAfter array", () => {
        let deleteAfterNodes;
        const nodesBeingDeleted = [new SingleNode(100), new SingleNode(200)];

        beforeAll(() => {
            deleteAfterNodes = [SLL._head, SLL._tail];
            SLL.insertAfter(nodesBeingDeleted[0], deleteAfterNodes[0]);
            SLL.insertAfter(nodesBeingDeleted[1], deleteAfterNodes[1]);
        });

        it("should throw a TypeError if one/some/all nodes are not a SingleNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => SLL.deleteAfter(fakeNodes)).toThrow(TypeError);
        });
        it("should delete the nodes after the given nodes", () => {
            SLL.deleteAfter(deleteAfterNodes);
            expect(SLL.head).toMatchObject(deleteAfterNodes[0]);
            expect(SLL.tail).toMatchObject(deleteAfterNodes[1]);
            expect(deleteAfterNodes[0].next).not.toMatchObject(
                nodesBeingDeleted[0]
            );
            expect(deleteAfterNodes[1].next).toBeNull();
            expect(SLL.find(nodesBeingDeleted[0].data)).toBeNull();
            expect(SLL.find(nodesBeingDeleted[1].data)).toBeNull();
        });
    });

    describe("clear", () => {
        const clonedList = SLL.clone();

        it("should delete all nodes in the list", () => {
            clonedList.clear();
            expect(clonedList.head).toBeNull();
            expect(clonedList.tail).toBeNull();
        });
    });

    describe("get", () => {
        it("should throw a TypeError if the value entered is not a number", () => {
            expect(() => SLL.get(NaN)).toThrow(TypeError);
        });
        it("should respond with the node at the index provided", () => {
            const getHeadNode = SLL.get(0);
            const getTailNode = SLL.get(SLL.size - 1);
            expect(getHeadNode).toMatchObject(SLL.head);
            expect(getTailNode).toMatchObject(SLL.tail);
        });
    });

    describe("find", () => {
        it("should return null if no node is found", () => {
            const findNode = SLL.find("this is a non existent node");
            expect(findNode).toBeNull();
        });
        it("should respond with the node with the data provided", () => {
            const findHeadNode = SLL.find(SLL.head.data);
            const findTailNode = SLL.find(SLL.tail.data);
            expect(findHeadNode).toMatchObject(SLL.head);
            expect(findTailNode).toMatchObject(SLL.tail);
        });
    });

    describe("getNodeBefore", () => {
        it("should throw an error if the node is not an instance of SingleNode", () => {
            const fakeNode = { data: "fake data" };
            expect(() => SLL.getNodeBefore(fakeNode)).toThrow(TypeError);
        });
        it("should respond with null if the node is the head node", () => {
            expect(SLL.getNodeBefore(SLL.head)).toBeNull();
        });
        it("should respond with the node before the given node", () => {
            const expectedNode = SLL.head;
            const node = expectedNode.next;
            const getNodeBefore = SLL.getNodeBefore(node);
            expect(getNodeBefore).toBeInstanceOf(SingleNode);
            expect(getNodeBefore).toMatchObject(expectedNode);
        });
    });

    describe("forEach", () => {
        it("should throw a TypeError if the callback function is not a function", () => {
            expect(() => SLL.forEach()).toThrow(TypeError);
        });
        it("should loop through all the nodes in the list", () => {
            let focusedNode = SLL.head;
            SLL.forEach((node, list) => {
                expect(node).toMatchObject(focusedNode);
                expect(list).toMatchObject(SLL);
                focusedNode = focusedNode.next;
            });
        });
        it("should bind thisArg to the function", () => {
            let forEachBind;
            SLL.forEach(function () {
                forEachBind = this;
            }, SLL.head);
            expect(forEachBind).toMatchObject(SLL.head);
        });
    });

    describe("filter", () => {
        it("should throw a TypeError if the callback function is not a function", () => {
            expect(() => SLL.filter()).toThrow(TypeError);
        });
        it("should loop through all the nodes in the list", () => {
            let focusedNode = SLL.head;
            SLL.filter((node, list) => {
                expect(node).toMatchObject(focusedNode);
                expect(list).toMatchObject(SLL);
                focusedNode = focusedNode.next;
            });
        });
        it("should bind thisArg to the function", () => {
            let filterBind;
            SLL.filter(function () {
                filterBind = this;
            }, SLL.head);
            expect(filterBind).toMatchObject(SLL.head);
        });
        it("should remove nodes that don't pass the filter", () => {
            const expectedList = SLL.clone();
            expectedList.delete(SLL.head);
            const filterList = SLL.filter((node) => {
                if (!SingleNode.compareInstance(node, SLL.head)) {
                    return true;
                }
            });
            expect(filterList).toMatchObject(expectedList);
        });
    });

    describe("clone", () => {
        let cloneList;

        it("should clone the list", () => {
            expect((clonelist = SLL.clone())).toMatchObject(SLL);
        });
        it("should not affect the original list", () => {
            clonelist.get(0).data = "bad";
            expect(clonelist.get(0).data).toStrictEqual("bad");
            expect(SLL.get(0).data).not.toStrictEqual("bad");
        });
    });

    describe("size", () => {
        it("should return the size of the list", () => {
            const list = new SinglyLinkedList();
            list.append(new SingleNode(1));
            expect(list.size).toBe(1);
        });
    });

    describe("toArray", () => {
        it("should return an array of the nodes", () => {
            const list = new SinglyLinkedList();
            list.append(new SingleNode(1));
            expect(list.toArray()).toMatchObject([new SingleNode(1)]);
        });
    });

    describe("toString", () => {
        it("should return a string representation of the list", () => {
            const list = new SinglyLinkedList();
            list.append(new SingleNode(1));
            list.append(new SingleNode(2));
            expect(list.toString()).toStrictEqual("1 -> 2");
        });
    });

    describe("toStringReverse", () => {
        it("should return a string representation of the list in reverse", () => {
            const list = new SinglyLinkedList();
            list.append(new SingleNode(1));
            list.append(new SingleNode(2));
            expect(list.toStringReverse()).toStrictEqual("2 <- 1");
        });
    });
});

describe("SinglyLinkedList test", () => {
    it("SLL should finish with numbers in order", () => {
        let currentNumber = SLL.head.data;
        expect(typeof currentNumber).toBe("number");
        SLL.forEach((node) => {
            expect(typeof node.data).toBe("number");
            expect(node.data).toBe(currentNumber);
            currentNumber++;
        });
    });
});
