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
	var fullPermutation = require('./full-permutation')

	var Graph = function () {
		// nothing
	}

	Graph.prototype.eachNode = function (operation) {
		var nodes = this.nodes()
		for (var i in nodes) {
			if (operation(nodes[i])) {
				return true
			}
		}
		return false
	}

	// if two graphs is isostructural
	Graph.prototype.isostructural = function (graph) {
		if (this.edgeCount() != graph.edgeCount()
			|| this.nodeCount() != graph.nodeCount()) {
			return false
		}

		var me = this

		var change = new Array(this.nodeCount())
		for (var i = 0; i < change.length; i++) {
			change[i] = i
		}

		var same = fullPermutation(change, function (change) {
			// map state to state
			var thisNodes = me.nodes()
			var otherNodes = graph.nodes()
			var stateMap = {}
			for (var i in change) {
				var j = change[i]
				stateMap[thisNodes[i]] = otherNodes[j]
			}

			if (me._compare(graph, stateMap)) {
				return true
			}
		})

		return same || false
	}

	return Graph
})