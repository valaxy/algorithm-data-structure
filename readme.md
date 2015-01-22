- Use LinkedListNode to build linked list yourself
- Use LinkedList to build linked list but not use any build function of LinkedNode

# LinkedNode
```javascript
var LinkedNode = require('src/linked-list-node')
var node = new LinkedNode
node.next()
node.prev()
node.addNext(node)
node.addPrev(node)
node.remove()
```

# LinkedList
```javascript
var LinkedList = require('src/linked-list')
var list = new LinkedList
list.head()
list.tail()
list.count()
list.each(function(node) { })
list.insertAfter(current, insert)
list.insertBefore(current, insert)
list.addLast(node)
list.addFirst(node)
list.remove(node)
```
