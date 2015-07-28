# OrderedTreeNode
- **ArrayOrderedNode** Use array to save the children of a node
- **LinkeOrderedNode** Use linked list to save the children of a node
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
delete()           |**O(c)**         |x

# FixNode
- **BinaryNode** 
- **FixNode**
- c is the fix chidrent count of node
- n is total count of nodes of tree

api               |BinaryNode|FixNode
------------------|----------|-------
parent            |O(1)      |O(1)
child             |O(1)      |O(1)
hasChildAt        |O(1)      |O(1)
maxChildrenCount  |O(1)      |O(1)
childrenCount     |O(1)      |O(c)
eachChild         |O(1)      |O(1)
setChild          |O(1)      |O(1)
setChildren       |O(1)      |O(c)
isostructural     |O(n)      |O(n)
toString          |O(n)      |O(n)
left              |O(1)      |x
right             |O(1)      |x
hasLeft           |O(1)      |x
hasRight          |O(1)      |x
setLeft           |O(1)      |x
setRight          |O(1)      |x
preorderWalk      |O(n)      |x
inorderWalk       |O(n)      |x
postorderWalk     |O(n)      |x


# Tree
- not finish
BinarySearchTree|SizeBalancedTree


# StructNode
- Use a hash-map to save the children of a node, each child has a unique name to represent
- not finish
