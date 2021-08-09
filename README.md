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
