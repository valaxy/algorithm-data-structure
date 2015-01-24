- This is under development.
- The doc is not completely finished

# Graph
- n is the count of nodes
- m is the count of edges
- c is the count of edge types
- O(1) means a consumer of operation of **finding string in a sorted array**(maybe?)

```javascript
var graph = Graph.fromJSON({
	'0': ['a', '1'],
	'1': ['b', '2'],
	'2': ['a', '2', 'b', '0']
})
```

- n = 3  
- m = 4
- c = 2 (`'a'` and `'b'`)



## Time Complexity
api             |Graph  |TransitionGraph|AdjacentGaph
----------------|-------|---------------|------------
toJSON()        |O(m)   |O(m)           |
nodes()         |O(n)   |O(n)           |
edges()         |O(m)   |O(m)           |
nodeCount()     |O(1)   |O(1)           |
edgeCount()     |O(n)   |O(n)           |
eachNode()      |O(n)   |O(n)           |
eachEdge()      |O(m)   |O(m)           |
eachEdge(from)  |O(m/n) |O(m/n)         |
hasNode()       |O(1)   |O(1)           |
hasEdge()       |O(m/n) |O(1)           |
addNode()       |O(1)   |O(1)           |
addEdge()       |O(1)   |O(1)           |
removeNode()    |O(1)   |O(1)           |
removeEdge()    |O(1)   |O(1)           |
isostructural() |O(n!m) |O(n!m)         |
----------------|-------|---------------|-------------
transfer()      |x      |O(1)           |x
