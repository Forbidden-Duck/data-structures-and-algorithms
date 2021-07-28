const BinaryTree = require("../src/structures/BinaryTree");
const TreeNode = require("../src/models/TreeNode");

const BT = new BinaryTree();

describe("BinaryTree", () => {
    describe("constructor", () => {
        it("should create an instance of BinaryTree", () => {
            expect(BT).toBeInstanceOf(BinaryTree);
        });
        it("should set the root property to null", () => {
            expect(BT.root).toBeNull();
        });
    });

    describe("get root", () => {
        it("should return the set TreeNode", () => {
            // New instance to not override existing root node
            const tree = new BinaryTree();
            const root = new TreeNode("root");
            tree._root = root;
            expect(tree.root).toMatchObject(root);
        });
    });

    describe("insert", () => {
        const insertNodes = [
            new TreeNode(642, 642),
            new TreeNode(834, 834),
            new TreeNode(166, 166),
        ];

        it("should throw a TypeError if a non TreeNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => BT.insert(fakeNode)).toThrow(TypeError);
        });
        it("should insert the TreeNodes into the tree", () => {
            BT.insert(insertNodes[0]); // Testing inserting individual nodes
            BT.insert(insertNodes[1]);
            BT.insert(insertNodes[2]);
            const find642 = BT.find((node) => node.key === 642);
            const find834 = BT.find((node) => node.key === 834);
            const find166 = BT.find((node) => node.key === 166);
            expect([find642, find834, find166]).toMatchObject(insertNodes);
        });
        it("should should set the root node as the first given node", () => {
            expect(BT.root).toMatchObject(insertNodes[0]);
        });
    });

    describe("insert array", () => {
        const insertNodes = [
            new TreeNode(804, 804),
            new TreeNode(638, 638),
            new TreeNode(744, 744),
        ];

        it("should throw a TypeError if one/some/all nodes are not a TreeNode instance", () => {
            const fakeNodes = [{ data: "fake data" }];
            expect(() => BT.insert(fakeNodes)).toThrow(TypeError);
        });
        it("should insert all the TreeNodes into the tree", () => {
            BT.insert(insertNodes);
            const find804 = BT.find((node) => node.key === 804);
            const find638 = BT.find((node) => node.key === 638);
            const find744 = BT.find((node) => node.key === 744);
            expect([find804, find638, find744]).toMatchObject(insertNodes);
        });
    });

    describe("delete", () => {
        let deleteNode;

        beforeAll(() => {
            // Make deleteNode not mutate the BinaryTree root
            deleteNode = new TreeNode(BT.root.key, BT.root.data);
        });

        it("should throw a TypeError if a non TreeNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => BT.delete(fakeNode)).toThrow(TypeError);
        });
        it("should delete the node from the tree", () => {
            BT.delete(deleteNode);
            expect(BT.root).not.toMatchObject(deleteNode);
            expect(BT.find((node) => node.key === deleteNode.key)).toBeNull();
        });
    });

    describe("delete array", () => {
        const deleteNodes = [
            new TreeNode(100, 100),
            new TreeNode(500, 500),
            new TreeNode(1000, 1000),
        ];

        beforeAll(() => {
            BT.insert(deleteNodes);
        });

        it("should throw a TypeError if one/some/all nodes are not a TreeNode instance", () => {
            BT.delete(deleteNodes);
        });
        it("should delete the nodes from the tree", () => {
            BT.delete(deleteNodes);
            const find100 = BT.find((node) => node.key === 100);
            const find500 = BT.find((node) => node.key === 500);
            const find1000 = BT.find((node) => node.key === 1000);
            expect([find100, find500, find1000]).toStrictEqual([
                null,
                null,
                null,
            ]);
        });
    });

    describe("clear", () => {
        const clonedList = BT.clone();

        it("should delete all nodes in the list", () => {
            clonedList.clear();
            expect(clonedList.root).toBeNull();
            expect(clonedList.size).toBe(0);
        });
    });

    describe("get", () => {
        it("should throw a TypeError if the key entered is not a number", () => {
            expect(() => BT.get(NaN)).toThrow(TypeError);
        });
        it("should respond with null if a non-existent node is provided", () => {
            expect(BT.get(999999)).toBeNull();
        });
        it("should respond with the node associated with the given key", () => {
            const rootNode = BT.get(BT.root.key);
            expect(rootNode).toMatchObject(BT.root);
        });
    });

    describe("find", () => {
        it("should throw a TypeError if the callback entered is not a function", () => {
            expect(() => BT.find("not a function")).toThrow(TypeError);
        });
        it("should respond with null if the callback does not return true", () => {
            expect(BT.find(() => {})).toBeNull();
        });
        it("should respond with the node specified in the callback", () => {
            const rootNode = BT.find((node) => node.key === BT.root.key);
            expect(rootNode).toMatchObject(BT.root);
        });
    });

    describe("min", () => {
        it("should respond with the node with the smallest key", () => {
            const minNode = BT.get(166);
            expect(BT.min()).toMatchObject(minNode);
        });
    });

    describe("max", () => {
        it("should respond with the node with the largest key", () => {
            const maxNode = BT.get(834);
            expect(BT.max()).toMatchObject(maxNode);
        });
    });

    describe("lowerBound", () => {
        it("should respond with a key less than the specified key", () => {
            const lessThanRoot = BT.lowerBound(BT.root.key);
            expect(lessThanRoot).toMatchObject(BT.get(638));
        });
    });

    describe("upperBound", () => {
        it("should respond with a key greater than the specified key", () => {
            const greaterThanRoot = BT.upperBound(BT.root.key);
            expect(greaterThanRoot).toMatchObject(BT.get(804));
        });
    });

    describe("forEach", () => {
        it("should throw an error if the callback is not a function", () => {
            expect(() => BT.forEach()).toThrow(TypeError);
        });
        it("should loop through all the nodes in the tree", () => {
            const expectedArray = BT.toPreOrder();
            let i = 0;
            BT.forEach((node, tree) => {
                expect(node).toMatchObject(expectedArray[i]);
                expect(tree).toMatchObject(BT);
                i++;
            });
        });
        it("should bind thisArg to the function", () => {
            let forEachBind;
            BT.forEach(
                function () {
                    forEachBind = this;
                    return null; // Stop loop immediately
                },
                BT.root,
                BT.root
            );
            expect(forEachBind).toMatchObject(BT.root);
        });
    });
});
