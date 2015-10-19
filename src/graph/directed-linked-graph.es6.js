var Linked = require('../linked/linked')
var Graph = require('./graph')
var _ = require('underscore')

class DirectedLinkedGraph extends Graph {
	constructor() {
		super()
		this._nodeLists = {}
	}

	_edgeMatch(toExpected, edgeExpected, linkedNode) {
		return (toExpected === undefined || linkedNode.value.to == toExpected)
			&& (edgeExpected === undefined || linkedNode.value.edge == edgeExpected)
	}

	hasNode(node) {
		return node in this._nodeLists
	}

	nodes() {
		return Object.keys(this._nodeLists)
	}

	nodeCount() {
		return this.nodes().length
	}


	/** from: undefined means any
	 ** to:   undefined means any
	 ** edge: undefined means any
	 */
	edgeCount(from, to, edge) {
		var count = 0
		if (from == undefined) {
			_.each(this._nodeLists, (nodeLink)=> {
				nodeLink.each((linkedNode)=> {
					if (this._edgeMatch(to, edge, linkedNode)) {
						count++
					}
				})
			})
		} else { // from != undefined
			var fromLink = this._nodeLists[from]
			fromLink.each((linkedNode) => {
				if (this._edgeMatch(to, edge, linkedNode)) {
					count++
				}
			})
		}
		return count
	}

	/** from: undefined means any
	 ** to:   undefined means any
	 ** edge: undefined means any
	 ** return: the edge or null
	 */
	hasEdge(from, to, edge) {
		var result = null
		if (from == undefined) {
			_.each(this._nodeLists, (nodeLink)=> {
				return nodeLink.each((linkedNode)=> {
					if (this._edgeMatch(to, edge, linkedNode)) {
						result = linkedNode
						return true
					}
				})
			})
		} else { // from != undefined
			var fromLink = this._nodeLists[from]
			fromLink.each((linkedNode) => {
				if (this._edgeMatch(to, edge, linkedNode)) {
					result = linkedNode
					return true
				}
			})
		}
		return result
	}

	eachNode(operation) {
		for (var node in this._nodeLists) {
			if (operation(node)) {
				return true
			}
		}
		return false
	}

	eachEdge(operation, from) {
		var me = this
		if (from != undefined) { // iterate edges of `from` node
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


	addNode(nodeId) {
		if (!(nodeId in this._nodeLists)) {
			this._nodeLists[nodeId] = new Linked
		}
	}

	addEdge(from, to, edge) {
		this.addNode(from)
		this.addNode(to)
		var node = this._nodeLists[from].addLast()
		node.value = {
			to  : to,
			edge: edge
		}
	}


	removeNode(nodeId) {
		if (!(nodeId in this._nodeLists)) {
			return false
		}

		// remove edge whose to is nodeId
		this._nodeLists[nodeId].each((linkedNode) => {
			if (linkedNode.value.to != nodeId) { // loop relation will delete by next sentence
				this.removeEdge(linkedNode.value.to, nodeId)
			}
		})

		delete this._nodeLists[nodeId]

		return true
	}

	  
	/**
	 ** return: true if at least one edge be removed
	 */
	removeEdge(from, to, edge) {
		var nodes = []
		if (from === undefined) {
			this.eachNode(function (node) {
				nodes.push(node)
			})
		} else {
			nodes.push(from)
		}

		// mark and then delete
		var result = false
		nodes.forEach((fromNode) => {
			var linked = this._nodeLists[fromNode]
			if (linked) {
				var needDeletes = []
				linked.each((linkedNode) => {
					if (this._edgeMatch(to, edge, linkedNode)) { // todo, 遍历过程中不能删除元素
						needDeletes.push(linkedNode)
						result = true
					}
				})
				linked.removeMany(needDeletes)
			}
		})

		return result
	}


	// same then return true
	_compare(graph, stateMap) {
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

	changeNodes(nodeMap) {
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
}

DirectedLinkedGraph.fromJSON = function (transitions) {
	var graph = new DirectedLinkedGraph
	Graph.parseTo(transitions, graph)
	return graph
}

module.exports = DirectedLinkedGraph