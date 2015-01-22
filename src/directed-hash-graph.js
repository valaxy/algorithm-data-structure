(function (factory) {
	if (typeof exports === 'object') {
		var result = factory(require, exports, module)
		if (result) {
			module.exports = result
		}
	} else {
		define(factory)
	}
})(function (require) {
	var BaseGraph = require('./graph')

	/**
	 * node is identified by a string
	 * edge has value which is a string
	 * any two nodes can only has one same value edge
	 * directed graph
	 */
	var Graph = function () {
		this._nodes = []
	}

	Graph.prototype = new BaseGraph

	Graph.createFromHash = function (hash) {
		var graph = new Graph()
		graph._nodes = hash
		for (var from in hash) {
			for (var edge in hash[from]) {
				var to = hash[from][edge]
				graph.addNode(to)
			}
		}
		return graph
	}

	Graph.prototype.nodes = function () {
		return Object.keys(this._nodes)
	}


	Graph.prototype.nodeCount = function () {
		return this.nodes().length
	}

	Graph.prototype.edgeCount = function () {
		var count = 0
		for (var node in this._nodes) {
			count += Object.keys(this._nodes[node]).length
		}
		return count
	}

	Graph.prototype.forEachEdge = function (operation) {
		for (var node in this._nodes) {
			for (var edge in this._nodes[node]) {
				if (operation(node, this._nodes[node][edge], edge)) {
					return true
				}
			}
		}
		return false
	}

	Graph.prototype.hasEdge = function (from, to, edge) {
		return from in this._nodes && to == this._nodes[from][edge]
	}

	Graph.prototype.addNode = function (node) {
		if (!(node in this._nodes)) {
			this._nodes[node] = {}
		}
		return this
	}

	Graph.prototype.addEdge = function (from, to, edge) {
		this.addNode(from)
		this.addNode(to)
		this._nodes[from][edge] = to
	}


	// same then return true
	Graph.prototype._compare = function (graph, stateMap) {
		return !this.forEachEdge(function (from, to, edge) {
				var otherFrom = stateMap[from]
				var otherTo = stateMap[to]
				if (!graph.hasEdge(otherFrom, otherTo, edge)) {
					return true // break
				}
			}
		)
	}

	return Graph
})


//
//Graph.prototype.move = function (from, edgeValue) {
//	var matrix = this._nodes[from]
//	if (edgeValue in  matrix) {
//		return matrix[edgeValue]
//	} else {
//		return false
//	}
//}
