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
		this._transitions = {}
	}

	Graph.prototype = new BaseGraph


	Graph.fromJSON = function (transitions) {
		var graph = new Graph
		for (var from in transitions) {
			var transition = transitions[from]
			for (var i = 0; i < transition.length; i += 2) {
				graph.addEdge(from, transition[i + 1], transition[i])
			}
		}
		return graph
	}


	Graph.prototype.nodes = function () {
		return Object.keys(this._transitions)
	}


	Graph.prototype.nodeCount = function () {
		return this.nodes().length
	}

	Graph.prototype.edgeCount = function () {
		var count = 0
		for (var node in this._transitions) {
			count += Object.keys(this._transitions[node]).length
		}
		return count
	}

	Graph.prototype.eachEdge = function (operation, from) {
		if (from == undefined) {
			for (var node in this._transitions) {
				for (var edge in this._transitions[node]) {
					if (operation(node, this._transitions[node][edge], edge)) {
						return true
					}
				}
			}
		} else {
			var transition = this._transitions[from]
			for (var edge in transition) {
				if (operation(from, transition[edge], edge)) {
					return true
				}
			}
		}
		return false
	}

	Graph.prototype.hasEdge = function (from, to, edge) {
		return from in this._transitions && to == this._transitions[from][edge]
	}

	Graph.prototype.removeEdge = function (from, to, edge) {
		if (this.hasEdge(from, to, edge)) {
			delete this._transitions[from][edge]
			return true
		}
		return false
	}

	Graph.prototype.addNode = function (node) {
		if (!(node in this._transitions)) {
			this._transitions[node] = {}
		}
		return this
	}

	Graph.prototype.addEdge = function (from, to, edge) {
		this.addNode(from)
		this.addNode(to)
		this._transitions[from][edge] = to
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


	Graph.prototype.transfer = function (from, edge) {
		if (from in this._transitions && this._transitions[from][edge]) {
			return this._transitions[from][edge]
		}
		return null
	}


	return Graph
})
