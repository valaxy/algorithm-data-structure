# OrderedTreeNode
- ArrayOrderedNode - Use array to save the children of a node
- LinkeOrderedNode - Use linked list to save the children of a node
- c is the children count of node
- h is the height of tree
- n is the node count of tree

api                |LinkedOrderedNode|ArrayOrderedNode
-------------------|-----------------|----------------
parent             |O(1)             |O(1)
childAt            |O(c)             |**O(1)**
eachChild          |O(c)             |O(c)
childrenCount      |O(1)             |O(1)
leftmostChild      |O(1)             |O(1)      
rightmostChild     |O(1)             |O(1)
leftSibling        |**O(1)**         |x
rightSibling       |**O(1)**         |x
leftmostDescendant |O(h)             |O(h)
rightmostDescendant|O(h)             |O(h)
isostructural      |O(n)             |O(n)
toString()         |O(n)             |O(n)
addChildFirst      |**O(1)**         |O(c)
addChildLast       |O(1)             |O(1)
appendLeftSibling  |**O(1)**         |x
appendRightSibing  |**O(1)**         |x         
cut()              |**O(1)**         |x

# FixNode
- not finish
FixNode|BinaryNode


# Tree
- not finish
BinarySearchTree|SizeBalancedTree


# StructNode
- Use a hash-map to save the children of a node, each child has a unique name to represent
- not finish
