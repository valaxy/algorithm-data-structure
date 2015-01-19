# ArrayNode
Use array to save the children of a node

**read method**
- parent()
- firstChild()
- lastChild()
- children([i])
- leftestDescendant()
- isSameStructure(otherTreeNode)
- toString()

**set method**
- addChild(child, ...)
- addChildAt(i, child)
- appendBrother(node)
- cut()

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
- addChildLast()
- addChildFirst()
- appendRightBrother()
- appendLeftBrother()

# StructNode
- Use a hash-map to save the children of a node, each child has a unique name to represent
- not finish