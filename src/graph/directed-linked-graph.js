var LinkedList = require('../linked/linked')
var LinkedListNode = require('../linked/linked-node')
var BaseGraph = require('./graph')

var Graph = function () {
	this._nodeLists = {}
}

Graph.prototype = new BaseGraph

Graph.fromJSON = function (transitions) {
	var graph = new Graph
	BaseGraph.parseTo(transitions, graph)
	return graph
}

Graph.prototype.hasNode = function (node) {
	return node in this._nodeLists
}

Graph.prototype.nodes = function () {
	return Object.keys(this._nodeLists)
}

Graph.prototype.nodeCount = function () {
	return this.nodes().length
}

Graph.prototype.edgeCount = function (from, to, edge) {
	var count = 0
	if (from == undefined) {
		for (var node in this._nodeLists) {
			var nodeLink = this._nodeLists[node]
			count += nodeLink.count()
		}

	} else {
		var list = this._nodeLists[from]
		list.each(function (linkedNode) {
			if (linkedNode.value.to == to && linkedNode.value.edge == edge) {
				count++
			}
		})
	}
	return count
}

Graph.prototype.hasEdge = function (from, to, edge) {
	if (from in this._nodeLists) {
		var nodeList = this._nodeLists[from]
		return nodeList.each(function (linkedNode) {
			if (linkedNode.value.to == to && linkedNode.value.edge == edge) {
				return true
			}
		})
	}
}

Graph.prototype.eachNode = function (operation) {
	for (var node in this._nodeLists) {
		if (operation(node)) {
			return true
		}
	}
	return false
}

Graph.prototype.eachEdge = function (operation, from) {
	var me = this
	if (from) { // iterate edges of `from` node
		return this._nodeLists[from].each(function (linkedNode) {
			if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
				return true
			}
		})
	} else { // iterate all edges
		return this.eachNode(function (from) {
			var nodeList = me._nodeLists[from]
			return nodeList.each(function (linkedNode) {
				if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
					return true
				}
			})
		})
	}
}


Graph.prototype.addNode = function (node) {
	if (!(node in this._nodeLists)) {
		this._nodeLists[node] = new LinkedList
	}
}

Graph.prototype.addEdge = function (from, to, edge) {
	this.addNode(from)
	this.addNode(to)
	var node = new LinkedListNode
	node.value = {
		to  : to,
		edge: edge
	}
	this._nodeLists[from].addLast(node)
}


// same then return true
Graph.prototype._compare = function (graph, stateMap) {
	var me = this
	return !this.eachEdge(function (from, to, edge) {
			var otherFrom = stateMap[from]
			var otherTo = stateMap[to]
			var count = me.edgeCount(from, to, edge)
			if (count != graph.edgeCount(otherFrom, otherTo, edge)) {
				return true // break
			}
		}
	)
}


Graph.prototype.changeNodes = function (nodeMap) {
	// change `from` nodes
	var me = this
	var newNodeLists = {}
	this.eachNode(function (node) {
		if (node in nodeMap) {
			newNodeLists[nodeMap[node]] = me._nodeLists[node]
		} else {
			newNodeLists[node] = me._nodeLists[node]
		}
	})
	this._nodeLists = newNodeLists

	// change `to` nodes
	this.eachNode(function (from) {
		me._nodeLists[from].each(function (linkedNode) {
			if (linkedNode.value.to in nodeMap) {
				linkedNode.value.to = nodeMap[linkedNode.value.to]
			}
		})
	})
}

module.exports = Graph