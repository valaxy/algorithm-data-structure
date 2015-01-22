define(function (require) {
	var LinkedGraph = require('src/directed-linked-graph')
	var HashGraph = require('src/directed-hash-graph')
	var Graphs = [LinkedGraph, HashGraph]

	QUnit.module('Graph')

	QUnit.test('addNode()/nodes()/nodeCount()', function (assert) {
		for (var i in Graphs) {
			var Graph = Graphs[i]
			var graph = new Graph

			// empty nodes
			assert.deepEqual(graph.nodes(), [])
			assert.equal(graph.nodeCount(), 0)

			// no empty nodes
			graph.addNode('x')
			graph.addNode('y')
			assert.deepEqual(graph.nodes(), ['x', 'y'])
			assert.equal(graph.nodeCount(), 2)

			// add repeat node
			graph.addNode('x')
			assert.deepEqual(graph.nodes(), ['x', 'y'])
			assert.equal(graph.nodeCount(), 2)
		}
	})

	QUnit.test('eachNode()', function (assert) {
		for (var i in Graphs) {
			var Graph = Graphs[i]
			var graph = new Graph

			// empty nodes
			assert.ok(!graph.eachNode(function () {
				assert.ok(false)
			}))

			// not empty, no break
			graph.addNode('x')
			graph.addNode('y')
			graph.addNode('z')
			var nodes = []
			assert.ok(!graph.eachNode(function (node) {
				nodes.push(node)
			}))
			assert.deepEqual(nodes, ['x', 'y', 'z'])

			// break
			var theNode
			assert.ok(graph.eachNode(function (node) {
				if (node == nodes[1]) {
					theNode = node
					return true
				}
			}))
			assert.equal(theNode, nodes[1])
		}
	})

})