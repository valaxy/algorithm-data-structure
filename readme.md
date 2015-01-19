# ArrayNode
- Use array to save the children of a node
- Not really finish

**read method**
- parent()
- firstChild()
- lastChild()
- children([i])
- leftestDescendant()
- isSameStructure(otherTreeNode)
- toString()

**set method**
- addChildLast(child, ...)
- addChildAt(i, child)
- appendRightBrother(node)


# LinkedNode
Use linked-list to save the children of a node

**read method**
- parent()
- eachChild(task)
- firstChild()
- lastChild()
- leftBrother()
- rightBrother()

** set method**
- addChildFirst()
- addChildLast()
- appendLeftBrother()
- appendRightBrother()
- cut()


# StructNode
- Use a hash-map to save the children of a node, each child has a unique name to represent
- not finish