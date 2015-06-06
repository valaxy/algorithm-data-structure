- **ArrayList** a wrap of Array
- **LinkedList** a data structure of linked list
- **Queue** You know it 
- **Stack** You know it

# Time Complexity

api         |ArrayList|LinkedList
------------|---------|----------
fromArray   |O(n)     |O(n)
toArray     |O(n)     |O(n)
each        |O(n)     |O(n)
first       |O(1)     |O(1)
last        |O(1)     |O(1)
count       |O(1)     |O(1)
isEmpty     |O(1)     |O(1)
getAt       |O(1)     |O(n)
setAt       |O(1)     |O(n)
indexOf     |O(n)     |O(n)
addFirst    |O(n)     |O(1)
addLast     |O(1)     |O(1)
insertAt    |O(n)     |O(n)
removeFirst |O(n)     |O(1)
removeLast  |O(1)     |O(1)
removeAt    |O(n)     |O(n)
clear       |O(1)     |O(1)
firstNode   |x        |O(1)
lastNode    |x        |O(1)
nextNode    |x        |O(1)
prevNode    |x        |O(1)
setValue    |x        |O(1)
getValue    |x        |O(1)
insertAfter |x        |O(1)
insertBefore|x        |O(1)


api     |Queue
--------|-----
isEmpty |O(1)
peek    |O(1)
dequeue |O(1)
inqueue |O(1)



api     |Stack
--------|-----
isEmpty |O(1)
push    |O(1)
pop     |O(1)
peek    |O(1)

