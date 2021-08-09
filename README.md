# Data Structures and Algorithms

This project was not designed with the intent that non of the models, sorting algorithms and data structures would be used. This project was completed with the sole intent of broading my own knowledge and assisting others who required help with building similar data structures and algorithms.

## What is included

### **[Models](https://github.com/Forbidden-Duck/data-structures-and-algorithms/tree/master/src/models)**

-   [SingleNode](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/models/SingleNode.js)
    > `.data (property)` _any_ type\
    > `.next (property)` _SingleNode_ type\
    > `.compareInstance(a: SingleNode, b: SingleNode) (static method)` => _boolean_ type
-   [DoubleNode](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/models/DoubleNode.js)
    > `.data (property)` _any_ type\
    > `.next (property)` _DoubleNode_ type\
    > `.previous (property)` _DoubleNode_ type\
    > `.compareInstance(a: DoubleNode, b: DoubleNode) (static method)` => _boolean_ type
-   [TreeNode](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/models/TreeNode.js)
    > `.key (property)` _number_ type\
    > `.data (property)` _any_ type\
    > `.left (property)` _TreeNode_ type\
    > `.right (property)` _TreeNode_ type\
    > `.parent (property)` _TreeNode_ type\
    > `.compareInstance(a: TreeNode, b: TreeNode) (static method)` => _boolean_ type
-   [HeapNode](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/models/HeapNode.js)
    > `.key (property)` _number_ type\
    > `.data (property)` _any_ type\
    > `.compareInstance(a: HeapNode, b: HeapNode) (static method)` => _boolean_ type
-   [GraphNode](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/models/GraphNode.js)
    > `.key (property)` _number_ type\
    > `.data (property)` _any_ type\
    > `.getEdge(node: GraphNode) (method)` => _GraphNode_ type\
    > `.addEdge(node: GraphNode) (method)` => _GraphNode_ type\
    > `.deleteEdge(key: number) (method)` => _void_ type\
    > `.compareInstance(a: GraphNode, b: GraphNode) (static method)` => _boolean_ type

### **[Structures](https://github.com/Forbidden-Duck/data-structures-and-algorithms/tree/master/src/structures)**

-   [SinglyLinkedList](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/SinglyLinkedList.js)
    > `.head (property)` _SingleNode_ type\
    > `.tail (property` _SingleNode_ type\
    > `.prepend(node: SingleNode) (method)` => _SingleNode_ type\
    > `.append(node: SingleNode) (method)` => _SingleNode_ type\
    > `.insertBefore(node: SingleNode, nodeBefore: SingleNode) (method)` => _SingleNode_ type\
    > `.insertAfter(node: SingleNode, nodeAfter: nodeAfter) (method)` => _SingleNode_ type\
    > `.delete(node: SingleNode) (method)` => _void_ type\
    > `.deleteBefore(node: SingleNode) (method)` => _void_ type\
    > `.deleteAfter(node: SingleNode) (method)` => _void_ type\
    > `.clear() (method)` => _void_ type\
    > `.get(index: number) (method)` => _SingleNode_ type\
    > `.find(callbackFn: function) (method)` => _SingleNode_ type\
    > `.getNodeBefore(node: SingleNode) (method)` => _SingleNode_ type\
    > `.forEach(callbackFn: function, thisArg?: any) (method)` => _void_ type\
    > `.filter(callbackFn: function, thisArg?: any) (method)` => _void_ type\
    > `.clone() (method)` => _SinglyLinkedList_ type\
    > `.size (property)` _number_ type\
    > `.toArray() (method)` => _SingleNode[]_ type\
    > `.toString() (method)` => _string_ type\
    > `.toStringReverse() (method)` => _string_ type
-   [DoublyLinkedList](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/DoublyLinkedList.js)
    > `.head (property)` _DoubleNode_ type\
    > `.tail (property` _DoubleNode_ type\
    > `.prepend(node: DoubleNode) (method)` => _DoubleNode_ type\
    > `.append(node: DoubleNode) (method)` => _DoubleNode_ type\
    > `.insertBefore(node: DoubleNode, nodeBefore: DoubleNode) (method)` => _DoubleNode_ type\
    > `.insertAfter(node: DoubleNode, nodeAfter: nodeAfter) (method)` => _DoubleNode_ type\
    > `.delete(node: DoubleNode) (method)` => _void_ type\
    > `.deleteBefore(node: DoubleNode) (method)` => _void_ type\
    > `.deleteAfter(node: DoubleNode) (method)` => _void_ type\
    > `.clear() (method)` => _void_ type\
    > `.get(index: number) (method)` => _DoubleNode_ type\
    > `.find(callbackFn: function) (method)` => _DoubleNode_ type\
    > `.getNodeBefore(node: DoubleNode) (method)` => _DoubleNode_ type\
    > `.forEach(callbackFn: function, thisArg?: any) (method)` => _void_ type\
    > `.filter(callbackFn: function, thisArg?: any) (method)` => _void_ type\
    > `.clone() (method)` => _SinglyLinkedList_ type\
    > `.size (property)` _number_ type\
    > `.toArray() (method)` => _DoubleNode[]_ type\
    > `.toString() (method)` => _string_ type\
    > `.toStringReverse() (method)` => _string_ type
-   [Queue](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/Queue.js)
    > `.peek (property)` _any_ type\
    > `.enqueue(value: any) (method)` => _void_ type\
    > `.dequeue() (method)` => _any_ type\
    > `.isEmpty() (method)` => _boolean_ type\
    > `.clear() (method)` => _void_ type\
    > `.clone() (method)` => _Queue_ type\
    > `.size (property)` _number_ type\
    > `.toArray() (method)` => _any[]_ type\
    > `.toString() (method)` => _string_ type
-   [Stack](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/Stack.js)
    > `.peek (property)` _any_ type\
    > `.push(value: any) (method)` => _void_ type\
    > `.pop() (method)` => _any_ type\
    > `.isEmpty() (method)` => _boolean_ type\
    > `.clear() (method)` => _void_ type\
    > `.clone() (method)` => _Stack_ type\
    > `.size (property)` _number_ type\
    > `.toArray() (method)` => _any[]_ type\
    > `.toString() (method)` => _string_ type
-   [BinaryTree](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/BinaryTree.js)
    > `.root (property)` _TreeNode_ type\
    > `.insert(node: TreeNode) (method)` => _TreeNode_ type\
    > `.delete(node: TreeNode) (method)` => _void_ type\
    > `.clear() (method)` => _void_ type\
    > `.get(key: number) (method)` => _TreeNode_ type\
    > `.find(callbackFn: function) (method)` => _TreeNode_ type\
    > `.min() (method)` => _TreeNode_ type\
    > `.max() (method)` => _TreeNode_ type\
    > `.lowerBound(key: number) (method)` => _TreeNode_ type\
    > `.upperBound(key: number) (method)` => _TreeNode_ type\
    > `.forEach(callbackFn: function, startNode?: TreeNode, thisArg?: any) (method)` => _void_ type\
    > `.clone() (method)` => _BinaryTree_ type\
    > `.size (property)` _number_ type\
    > `.toPreOrder() (method)` => _TreeNode[]_ type\
    > `.toInOrder() (method)` => _TreeNode[]_ type\
    > `.toPostOrder() (method)` => _TreeNode[]_ type
-   [HashMap](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/HashMap.js)
    > `.keys (property)` _string[]_ type\
    > `.hashes (property)` _number[]_ type\
    > `.values (property)` _any[]_ type\
    > `.hash(key: string) (method)` => _number_ type\
    > `.has(key: string) (method)` => _boolean_ type\
    > `.get(key: string) (method)` => _any_ type\
    > `.set(key: string, value: any) (method)` => _any_ type\
    > `.delete(key: string) (method)` => _void_ type
-   [Heap](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/Heap.js)
    > `.root (property)` _HeapNode_ type\
    > `.insert(node: HeapNode) (method)` => _HeapNode_ type\
    > `.delete(node: HeapNode) (method)` => _void_ type\
    > `.clear() (method)` => _void_ type\
    > `.get(index: number) (method)` => _HeapNode_ type\
    > `.find(callbackFn: function, thisArg?: any) (method)` => _HeapNode_ type\
    > `.findIndex(callbackFn: function, thisArg?: any) (method)` => _number_ type\
    > `.forEach(callbackFn: function, thisArg?: any) (method)` => _void_ type\
    > `.clone(HeapType: MinHeap | MaxHeap) (method)` => _MinHeap | MaxHeap_ type
-   [MinHeap](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/MinHeap.js) extends [Heap](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/Heap.js)
    > `.compareKeys(parentKey: number, childKey: number) (method)` => _boolean_ type\
    > `.clone() (method)` => _MinHeap_ type
-   [MaxHeap](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/MaxHeap.js) extends [Heap](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/Heap.js)
    > `.compareKeys(parentKey: number, childKey: number) (method)` => _boolean_ type\
    > `.clone() (method)` => _MinHeap_ type
-   [Graph](https://github.com/Forbidden-Duck/data-structures-and-algorithms/blob/master/src/structures/Graph.js)
    > `constructor(egdeDirection?: "directed" | "undirected")`\
    > `.isDirected (property)` _boolean_ type\
    > `.hasVertex(key: number) (method)` => _boolean_ type\
    > `.addVertex(node: GraphNode) (method)` => _GraphNode_ type\
    > `.deleteVertex(key: number) (method)` => _void_ type\
    > `.hasEdge(srcKey: number, destKey: number) (method)` => _boolean_ type\
    > `.addEdge(source: GraphNode, dest: GraphNode) (method)` => _{source: GraphNode, destination: GraphNode}_ type\
    > `.deleteEdge(srcKey: number, destKey: number) (method)` => _void_ type\
    > `.clear() (method)` => _void_ type\
    > `.clone() (method)` => _Graph_ type\
    > `.verticesSize (property)` _number_ type\
    > `.size (property)` _number_ type\
    > `.toBFS() (method)` => _GraphNode[]_ type\
    > `.toDFS() (method)` => _GraphNode[]_ type
