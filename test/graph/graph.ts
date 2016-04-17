define(function (require) {
	var LinkedGraph = require('cjs!lib/graph/directed-linked-graph')
	var TransitionGraph = require('cjs!lib/graph/directed-transition-graph')
	var Graphs = [LinkedGraph, TransitionGraph]

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
			var theNode = null
			assert.ok(graph.eachNode(function (node) {
				if (node == nodes[1]) {
					theNode = node
					return true
				}
			}))
			assert.equal(theNode, nodes[1])
		}
	})

	QUnit.test('changeNodes()', function (assert) {
		for (var i in Graphs) {
			var Graph = Graphs[i]

			var graph1 = Graph.fromJSON({
				'1': ['a', '2'],
				'2': ['b', '3'],
				'3': ['c', '4']
			})
			var graph2 = Graph.fromJSON({
				'1': ['a', '2'],
				'2': ['b', '3'],
				'3': ['c', '4']
			})
			graph2.changeNodes({
				'1': '3',
				'3': '2',
				'2': '1'
			})

			assert.ok(graph2.hasEdge('3', '1', 'a'))
			assert.ok(!graph2.hasEdge('1', '2', 'a'))
			assert.ok(graph1.isostructural(graph2))
		}
	})


	QUnit.test('removeEdge()', function (assert) {
		for (var i in Graphs) {
			var Graph = Graphs[i]

			var graph = Graph.fromJSON({
				x: ['a', 'y', 'b', 'z']
			})

			// common
			assert.ok(graph.removeEdge('x', 'y', 'a'))
			assert.ok(!graph.hasEdge('x', 'y', 'a'))
			assert.equal(graph.edgeCount(), 1)

			// no exist `value`
			assert.ok(!graph.removeEdge('x', 'z', 'a'))
			assert.equal(graph.edgeCount(), 1)

			// no exist `to`
			assert.ok(!graph.removeEdge('x', 'y', 'b'))
			assert.equal(graph.edgeCount(), 1)

			// no exist `from`
			assert.ok(!graph.removeEdge('xx', 'z', 'b'))
			assert.equal(graph.edgeCount(), 1)
		}
	})

})