'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Linked = require('../linked/linked');
var Graph = require('./graph');
var _ = require('underscore');

var DirectedLinkedGraph = (function (_Graph) {
	_inherits(DirectedLinkedGraph, _Graph);

	function DirectedLinkedGraph() {
		_classCallCheck(this, DirectedLinkedGraph);

		_get(Object.getPrototypeOf(DirectedLinkedGraph.prototype), 'constructor', this).call(this);
		this._nodeLists = {};
	}

	_createClass(DirectedLinkedGraph, [{
		key: '_edgeMatch',
		value: function _edgeMatch(toExpected, edgeExpected, linkedNode) {
			return (toExpected === undefined || linkedNode.value.to == toExpected) && (edgeExpected === undefined || linkedNode.value.edge == edgeExpected);
		}
	}, {
		key: 'hasNode',
		value: function hasNode(node) {
			return node in this._nodeLists;
		}
	}, {
		key: 'nodes',
		value: function nodes() {
			return Object.keys(this._nodeLists);
		}
	}, {
		key: 'nodeCount',
		value: function nodeCount() {
			return this.nodes().length;
		}

		/** from: undefined means any
   ** to:   undefined means any
   ** edge: undefined means any
   */
	}, {
		key: 'edgeCount',
		value: function edgeCount(from, to, edge) {
			var _this = this;

			var count = 0;
			if (from == undefined) {
				_.each(this._nodeLists, function (nodeLink) {
					nodeLink.each(function (linkedNode) {
						if (_this._edgeMatch(to, edge, linkedNode)) {
							count++;
						}
					});
				});
			} else {
				// from != undefined
				var fromLink = this._nodeLists[from];
				fromLink.each(function (linkedNode) {
					if (_this._edgeMatch(to, edge, linkedNode)) {
						count++;
					}
				});
			}
			return count;
		}

		/** from: undefined means any
   ** to:   undefined means any
   ** edge: undefined means any
   ** return: the edge or null
   */
	}, {
		key: 'hasEdge',
		value: function hasEdge(from, to, edge) {
			var _this2 = this;

			var result = null;
			if (from == undefined) {
				_.each(this._nodeLists, function (nodeLink) {
					return nodeLink.each(function (linkedNode) {
						if (_this2._edgeMatch(to, edge, linkedNode)) {
							result = linkedNode;
							return true;
						}
					});
				});
			} else {
				// from != undefined
				var fromLink = this._nodeLists[from];
				fromLink.each(function (linkedNode) {
					if (_this2._edgeMatch(to, edge, linkedNode)) {
						result = linkedNode;
						return true;
					}
				});
			}
			return result;
		}
	}, {
		key: 'eachNode',
		value: function eachNode(operation) {
			for (var node in this._nodeLists) {
				if (operation(node)) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'eachEdge',
		value: function eachEdge(operation, from) {
			var me = this;
			if (from != undefined) {
				// iterate edges of `from` node
				return this._nodeLists[from].each(function (linkedNode) {
					if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
						return true;
					}
				});
			} else {
				// iterate all edges
				return this.eachNode(function (from) {
					var nodeList = me._nodeLists[from];
					return nodeList.each(function (linkedNode) {
						if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
							return true;
						}
					});
				});
			}
		}
	}, {
		key: 'addNode',
		value: function addNode(nodeId) {
			if (!(nodeId in this._nodeLists)) {
				this._nodeLists[nodeId] = new Linked();
			}
		}
	}, {
		key: 'addEdge',
		value: function addEdge(from, to, edge) {
			this.addNode(from);
			this.addNode(to);
			var node = this._nodeLists[from].addLast();
			node.value = {
				to: to,
				edge: edge
			};
		}
	}, {
		key: 'removeNode',
		value: function removeNode(nodeId) {
			var _this3 = this;

			if (!(nodeId in this._nodeLists)) {
				return false;
			}

			// remove edge whose to is nodeId
			this._nodeLists[nodeId].each(function (linkedNode) {
				if (linkedNode.value.to != nodeId) {
					// loop relation will delete by next sentence
					_this3.removeEdge(linkedNode.value.to, nodeId);
				}
			});

			delete this._nodeLists[nodeId];

			return true;
		}

		/**
   ** return: true if at least one edge be removed
   */
	}, {
		key: 'removeEdge',
		value: function removeEdge(from, to, edge) {
			var _this4 = this;

			var nodes = [];
			if (from === undefined) {
				this.eachNode(function (node) {
					nodes.push(node);
				});
			} else {
				nodes.push(from);
			}

			// mark and then delete
			var result = false;
			nodes.forEach(function (fromNode) {
				var linked = _this4._nodeLists[fromNode];
				if (linked) {
					var needDeletes = [];
					linked.each(function (linkedNode) {
						if (_this4._edgeMatch(to, edge, linkedNode)) {
							// todo, 遍历过程中不能删除元素
							needDeletes.push(linkedNode);
							result = true;
						}
					});
					linked.removeMany(needDeletes);
				}
			});

			return result;
		}

		// same then return true
	}, {
		key: '_compare',
		value: function _compare(graph, stateMap) {
			var me = this;
			return !this.eachEdge(function (from, to, edge) {
				var otherFrom = stateMap[from];
				var otherTo = stateMap[to];
				var count = me.edgeCount(from, to, edge);
				if (count != graph.edgeCount(otherFrom, otherTo, edge)) {
					return true; // break
				}
			});
		}
	}, {
		key: 'changeNodes',
		value: function changeNodes(nodeMap) {
			// change `from` nodes
			var me = this;
			var newNodeLists = {};
			this.eachNode(function (node) {
				if (node in nodeMap) {
					newNodeLists[nodeMap[node]] = me._nodeLists[node];
				} else {
					newNodeLists[node] = me._nodeLists[node];
				}
			});
			this._nodeLists = newNodeLists;

			// change `to` nodes
			this.eachNode(function (from) {
				me._nodeLists[from].each(function (linkedNode) {
					if (linkedNode.value.to in nodeMap) {
						linkedNode.value.to = nodeMap[linkedNode.value.to];
					}
				});
			});
		}
	}]);

	return DirectedLinkedGraph;
})(Graph);

DirectedLinkedGraph.fromJSON = function (transitions) {
	var graph = new DirectedLinkedGraph();
	Graph.parseTo(transitions, graph);
	return graph;
};

module.exports = DirectedLinkedGraph;

