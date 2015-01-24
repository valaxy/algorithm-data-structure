- This is under development.
- The doc is not completely finished

# Graph
- n is the count of nodes
- m is the count of edges
- c is the count of edge types
- O(1) means a consumer of operation of string-compare 

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
api/Graph    |Graph  |TransitionGraph|AdjacentGaph
-|-
nodes()      |O(n)
nodeCount()  |O(1)
edgeCount()  |O(n)
hasEdge()    |O(m/n)
eachNode()   |O(n)
eachEdge()   |O(m)
toJSON()     |O(n+m)
addNode()    |O(1)
addEdge()    |O(1)
removeEdge() |
-------------|-------|---------------|-------------
transfer()   |\      |O(logn)
