# ArrayNode
- Use array to save the children of a node
- Not really finish

**read method**

- parent()
- eachChild(task)
- childrenCount()
- firstChild()
- lastChild()
- leftestDescendant()
- isSameStructure(otherTreeNode)
- toStringTree()

- child(i)


**set method**

- addChildFirst(child, ...)
- addChildLast(child, ...)

- addChildAt(i, child)


# LinkedNode
Use linked-list to save the children of a node

**read method**

- parent()
- eachChild(task)
- childrenCount()
- firstChild()
- lastChild()
- leftestDescendant()
- isSameStructure(otherTreeNode)
- toStringTree()

- leftBrother()
- rightBrother()

**set method**

- addChildFirst(child, ...)
- addChildLast(child, ...)

- appendLeftBrother()
- appendRightBrother()
- cut()


# StructNode
- Use a hash-map to save the children of a node, each child has a unique name to represent
- not finish