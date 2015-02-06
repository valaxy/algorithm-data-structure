- Use LinkedNode to build linked list yourself
- Use Linked to build linked list but not use any build function of LinkedNode

# LinkedNode
```javascript
var LinkedNode = require('src/linked/linked-node')
var node = new LinkedNode
node.next()
node.prev()
node.value()
node.setValue(value)
node.addNext(node)
node.addPrev(node)
node.remove()
```

# Linked
```javascript
var LinkedList = require('src/linked/linked')
var linked = new Linked
linked.head()
linked.tail()
linked.count()
linked.each(function(node))
linked.insertAfter(node, value)
linked.insertBefore(node, value)
linked.addLast(value)
linked.addFirst(value)
linked.remove(node)
```
