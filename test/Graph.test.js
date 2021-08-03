const Graph = require("../src/structures/Graph");
const GraphNode = require("../src/models/GraphNode");
const HashMap = require("../src/structures/HashMap");

const G = new Graph();

describe("Graph", () => {
    describe("constructor", () => {
        it("should throw an TypeError if edgeDirection is invalid", () => {
            expect(() => new Graph("not an edge direction")).toThrow(TypeError);
        });
        it("should create an instance of Graph", () => {
            expect(G).toBeInstanceOf(Graph);
        });
        it("should set edgeDirection to directed by default", () => {
            expect(G.isDirected).toBe(true);
        });
        it("should set edgeDirection to undirected", () => {
            expect(new Graph("undirected").isDirected).toBe(false);
        });
        it("should set vertices to an empty HashMap", () => {
            expect(G.vertices).toBeInstanceOf(HashMap);
            expect(G.vertices.keys).toStrictEqual([]);
            expect(G.vertices.values).toStrictEqual([]);
        });
    });

    describe("hasVertex", () => {
        it("should throw an TypeError if key is not a number", () => {
            expect(() => G.hasVertex(NaN)).toThrow(TypeError);
        });
        it("should return a false if there isn't", () => {
            expect(G.hasVertex(1)).toBe(false);
        });
        it("should return true if there is", () => {
            const graph = new Graph();
            graph.vertices.set(1, new GraphNode(1, 1));
            expect(graph.hasVertex(1)).toBe(true);
        });
    });

    describe("addVertex", () => {
        const addVertexNodes = [
            new GraphNode(1, 1),
            new GraphNode(2, 2),
            new GraphNode(3, 3),
            new GraphNode(4, 4),
        ];

        it("should throw a TypeError if a non GraphNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => G.addVertex(fakeNode)).toThrow(TypeError);
        });
        it("should add the vertex to the graph", () => {
            G.addVertex(addVertexNodes[0]);
            G.addVertex(addVertexNodes[1]);
            G.addVertex(addVertexNodes[2]);
            G.addVertex(addVertexNodes[3]);
            expect(G.vertices.get(1)).toMatchObject(addVertexNodes[0]);
            expect(G.vertices.get(2)).toMatchObject(addVertexNodes[1]);
            expect(G.vertices.get(3)).toMatchObject(addVertexNodes[2]);
            expect(G.vertices.get(4)).toMatchObject(addVertexNodes[3]);
        });
    });

    describe("deleteVertex", () => {
        let deleteVertexNodes;

        beforeAll(() => {
            deleteVertexNodes = [G.vertices.get(3), G.vertices.get(4)];
            G.addEdge(3, 4);
        });

        it("should throw a TypeError if the key is not a number", () => {
            expect(() => G.deleteVertex(NaN)).toThrow(TypeError);
        });
        it("should delete the vertex from the graph", () => {
            G.deleteVertex(3);
            G.deleteVertex(4);
            expect(G.vertices.get(3)).toBeUndefined();
        });
        it("should remove the edges from the nodes", () => {
            expect(deleteVertexNodes[0].getEdge(4)).toBeUndefined();
            expect(deleteVertexNodes[1].getEdge(3)).toBeUndefined();
        });
    });

    describe("hasEdge", () => {
        it("should throw an TypeError if key is not a number", () => {
            expect(() => G.hasEdge(NaN)).toThrow(TypeError);
        });
        it("should return a false if there isn't", () => {
            expect(G.hasEdge(1, 2)).toBe(false);
        });
        it("should return true if there is", () => {
            const graph = G.clone();
            graph.vertices.get(1).edges.set(2, graph.vertices.get(2));
            expect(graph.hasEdge(1, 2)).toBe(true);
        });
    });

    describe("addEdge", () => {
        it("should throw a TypeError if a non GraphNode is passed", () => {
            const fakeNode = { data: "fake data" };
            expect(() => G.addEdge(fakeNode, fakeNode)).toThrow(TypeError);
        });
        it("should add the edge to the vertex", () => {
            const node1 = G.vertices.get(1);
            const node2 = G.vertices.get(2);
            G.addEdge(node1, node2);
            expect(G.hasEdge(1, 2)).toBe(true);
            expect(G.hasEdge(2, 1)).toBe(false);
            expect(node1.getEdge(2)).toMatchObject(node2);
            expect(node2.getEdge(1)).toBeUndefined();
        });
        it("should add edges to both nodes if graph is undirected", () => {
            const graph = G.clone();
            graph.isDirected = false;
            const node1 = graph.vertices.get(1);
            const node2 = graph.vertices.get(2);
            graph.addEdge(node1, node2);
            expect(graph.hasEdge(1, 2)).toBe(true);
            expect(graph.hasEdge(2, 1)).toBe(true);
            expect(node1.getEdge(2)).toMatchObject(node2);
            expect(node2.getEdge(1)).toMatchObject(node1);
        });
    });

    describe("deleteEdge", () => {
        beforeAll(() => {
            G.addEdge(G.vertices.get(2), G.vertices.get(1));
        });

        it("should throw a TypeError if the keys are not a number", () => {
            expect(() => G.deleteVertex(NaN, NaN)).toThrow(TypeError);
        });
        it("should delete the edge from the vertex", () => {
            const node1 = G.vertices.get(1);
            const node2 = G.vertices.get(2);
            G.deleteEdge(1, 2);
            expect(G.hasEdge(1, 2)).toBe(false);
            expect(G.hasEdge(2, 1)).toBe(true);
            expect(node1.getEdge(2)).toBeUndefined();
            expect(node2.getEdge(1)).toMatchObject(node1);
        });
        it("should delete both node edges if graph is undirected", () => {
            const graph = G.clone();
            graph.isDirected = false;
            const node1 = graph.vertices.get(1);
            const node2 = graph.vertices.get(2);
            graph.deleteEdge(1, 2);
            expect(graph.hasEdge(1, 2)).toBe(false);
            expect(graph.hasEdge(2, 1)).toBe(false);
            expect(node1.getEdge(2)).toBeUndefined();
            expect(node2.getEdge(1)).toBeUndefined();
        });
    });

    describe("clear", () => {
        const clonedGraph = G.clone();

        it("should clear all the vertices and edges in the graph", () => {
            clonedGraph.clear();
            expect(clonedGraph.vertices.keys).toStrictEqual([]);
            expect(clonedGraph.vertices.values).toStrictEqual([]);
            expect(clonedGraph.verticesSize).toBe(0);
            expect(clonedGraph.edgesSize).toBe(0);
        });
    });

    describe("clone", () => {
        let clonedGraph;

        it("should clone the graph", () => {
            expect((clonedGraph = G.clone())).toMatchObject(G);
        });
        it("should not affect the original graph", () => {
            clonedGraph.vertices.get(1).data = "bad";
            expect(clonedGraph.vertices.get(1).data).toStrictEqual("bad");
            expect(G.vertices.get(1).data).not.toStrictEqual("bad");
        });
    });

    describe("verticesSize", () => {
        it("should return the size of the vertices in the graph", () => {
            expect(G.verticesSize).toBe(2);
        });
    });

    describe("edgesSize", () => {
        it("should return the size of edges in the graph", () => {
            expect(G.edgesSize).toBe(1);
        });
    });

    describe("toBFS", () => {
        const graph = new Graph("undirected");
        let start;

        beforeAll(() => {
            start = graph.addEdge(1, 2).source;
            graph.addEdge(1, 3);
            graph.addEdge(1, 4);
            graph.addEdge(5, 2);
            graph.addEdge(6, 3);
            graph.addEdge(7, 3);
            graph.addEdge(8, 4);
            graph.addEdge(9, 5);
            graph.addEdge(10, 6);
        });

        it("should return the graph into an array representing the BFS", () => {
            const toBFS = graph.toBFS(start);
            expect(toBFS.map((item) => item.key)).toStrictEqual([
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            ]);
        });
    });

    describe("toDFS", () => {
        const graph = new Graph("undirected");
        let start;

        beforeAll(() => {
            start = graph.addEdge(1, 2).source;
            graph.addEdge(1, 3);
            graph.addEdge(1, 4);
            graph.addEdge(5, 2);
            graph.addEdge(6, 3);
            graph.addEdge(7, 3);
            graph.addEdge(8, 4);
            graph.addEdge(9, 5);
            graph.addEdge(10, 6);
        });

        it("should return the graph into an array representing the DFS", () => {
            const toDFS = graph.toDFS(start);
            expect(toDFS.map((item) => item.key)).toStrictEqual([
                1, 4, 8, 3, 7, 6, 10, 2, 5, 9,
            ]);
        });
    });
});
