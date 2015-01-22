define(function (require, exports) {
		var fullPermutation = require('./full-permutation')

		//
		// 所有的状态全用字符串表示, 边上的值也用字符串表示


		/**
		 * node is identified by a string
		 * edge has value which is a string
		 * any two nodes can only has one same value edge
		 * directed graph
		 */
		var TransferGraph = function () {

		}

		TransferGraph.createFromAdjacencyMatrix = function (adj) {
			this._nodes = adj
		}

		TransferGraph.prototype.addEdge = function (from, to, edgeValue) {
			if (!from in this._nodes) {
				this._nodes[from] = {}
			}
			this._nodes[from][edgeValue] = to
		}

		TransferGraph.prototype.nodes = function () {
			return Object.keys(this._nodes)
		}


		TransferGraph.prototype.nodeCount = function () {
			return Object.keys(this._nodes).length
		}


		TransferGraph.prototype.edgeCount = function () {
			var count = 0
			for (var nodeState in this._nodes) {
				count += Object.keys(this._nodes[nodeState]).length
			}
			return count
		}

		TransferGraph.prototype.forEachEdge = function (operation) {
			for (var node in this._nodes) {
				for (var edge in this._nodes[node]) {
					if (operation(node, this._nodes[node], edge)) {
						return true
					}
				}
			}
			return false
		}

		TransferGraph.prototype.hasEdge = function (from, to, edge) {
			return from in this._nodes && to == this._nodes[from][edge]
		}

		TransferGraph.prototype.transfer = function (from, edgeValue) {
			var matrix = this._nodes[from]
			if (edgeValue in  matrix) {
				return matrix[edgeValue]
			} else {
				return false
			}
		}


		// same return true
		TransferGraph.prototype._compare = function (graph, stateMap) {
			if (this.edgeCount() != graph.edgeCount()) {
				return false
			}

			return !this.forEachEdge(function (from, to, edge) {
					var otherFrom = stateMap[from]
					var otherTo = stateMap[to]
					if (!graph.hasEdge(otherFrom, otherTo, edge)) {
						return true // break
					}
				}
			)
		}

		/**
		 * 判断是否同构
		 * @param graph 另一个图
		 */
		TransferGraph.prototype.isostructural = function (graph) {
			var me = this

			var change = new Array(this.nodeCount())
			for (var i = 0; i < change.length; i++) {
				change[i] = i
			}

			var same = fullPermutation(change, function (change) {
				// map state to state
				var thisNodes = this.nodes()
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

			return same
		}

		return TransferGraph
	}
)