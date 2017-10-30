- **LinkedNode** basic component for building a linked list
- **Linked** basic component for building a linked list, used for processing lots of LinkedNode

# LinkedNode
```javascript
let LinkedNode = require('src/linked/linked-node')
let node = new LinkedNode
node.next()
node.prev()
node.addNext(node)
node.addPrev(node)
node.remove()
```

# Linked
```javascript
let Linked = require('src/linked/linked')
let linked = new Linked
linked.head()
linked.tail()
linked.count()
linked.each(function(node))
linked.insertAfter(node)
linked.insertBefore(node)
linked.addLast()
linked.addFirst()
linked.remove(node)
```
