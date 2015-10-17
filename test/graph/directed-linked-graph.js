define(function (require) {
	var Graph = require('cjs!src/graph/directed-linked-graph')

	QUnit.module('DirectedLinkedGraph')

	QUnit.test('fromJSON()/toJSON()', function (assert) {
		var def = {
			'1': ['a', '2'],
			'2': ['b', '3', 'c', '4'],
			'3': ['a', '1'],
			'4': ['4', '4'],
			'5': [] // empty
		}
		var graph = Graph.fromJSON(def)
		assert.deepEqual(graph.toJSON(), def)
	})

	QUnit.test('addEdge()/edgeCount()/hasEdge()', function (assert) {
		var graph = new Graph

		// empty
		assert.equal(graph.edgeCount(), 0)

		// no empty
		graph.addEdge('x', 'y', 'a')
		graph.addEdge('y', 'x', 'a')
		assert.equal(graph.edgeCount(), 2)
		assert.equal(graph.edgeCount('x', 'y', 'a'), 1)
		assert.equal(graph.edgeCount('x', 'z', 'c'), 0)
		assert.equal(graph.nodeCount(), 2)
		assert.ok(graph.hasEdge('x', 'y', 'a'))
		assert.ok(!graph.hasEdge('x', 'y', 'd'))

		// repeat value edge
		graph.addEdge('x', 'z', 'a')
		assert.equal(graph.edgeCount(), 3)
		assert.equal(graph.nodeCount(), 3)

		// repeat to-node
		graph.addEdge('x', 'z', 'b')
		assert.equal(graph.edgeCount(), 4)
		assert.equal(graph.nodeCount(), 3)

		// same edge
		graph.addEdge('x', 'z', 'b')
		assert.equal(graph.edgeCount(), 5)
		assert.equal(graph.edgeCount('x', 'z', 'b'), 2)
		assert.equal(graph.nodeCount(), 3)
	})


	QUnit.test('hasNode()', function (assert) {
		var graph = new Graph
		graph.addEdge('x', 'y', 'a')
		assert.ok(graph.hasNode('x'))
		assert.ok(!graph.hasNode('a'))
	})

	QUnit.test('eachEdge()', function (assert) {
		var graph = new Graph

		// empty
		assert.ok(!graph.eachEdge(function (from, to, edge) {
			assert.ok(false)
		}))

		// no empty, no break
		graph.addEdge('x', 'y', 'a')
		graph.addEdge('x', 'y', 'a')
		graph.addEdge('y', 'z', 'b')

		var edges = [
			['x', 'y', 'a'],
			['x', 'y', 'a'],
			['y', 'z', 'b']
		]
		var i = 0
		assert.ok(!graph.eachEdge(function (from, to, edge) {
			assert.deepEqual(edges[i++], [from, to, edge])
		}))
		assert.equal(i, 3)


		// empty, break
		i = 0
		assert.ok(graph.eachEdge(function () {
			if (i == 1) {
				return true
			}
			i++
		}))
		assert.equal(i, 1)

		// iterate one node
		i = 0
		assert.ok(!graph.eachEdge(function (from, to, edge) {
			assert.deepEqual(edges[i++], [from, to, edge])
		}, 'x'))
		assert.equal(i, 2)
	})

	QUnit.test('_compare()/isostructural()', function (assert) {
		var graph1 = new Graph
		graph1.addEdge('x', 'y', 'a')
		graph1.addEdge('x', 'y', 'a') // same edge
		graph1.addEdge('y', 'z', 'c')
		graph1.addEdge('y', 'x', 'd')
		graph1.addEdge('z', 'z', 'a') // link to itself

		var graph2 = new Graph
		graph2.addEdge('yy', 'xx', 'd')
		graph2.addEdge('zz', 'zz', 'a')
		graph2.addEdge('xx', 'yy', 'a')
		graph2.addEdge('xx', 'yy', 'a')
		graph2.addEdge('yy', 'zz', 'c')

		assert.ok(graph1._compare(graph2, {
			x: 'xx',
			y: 'yy',
			z: 'zz'
		}))
		assert.ok(!graph1._compare(graph2, {
			x: 'yy',
			y: 'xx',
			z: 'zz'
		}))

		assert.ok(graph1.isostructural(graph1))
		assert.ok(graph1.isostructural(graph2))

		graph1.addEdge('x', 'z', '1')
		graph2.addEdge('xx', 'yy', '2')
		assert.ok(!graph1.isostructural(graph2))
	})

	QUnit.test('removeEdges()', function (assert) {
		var graph = Graph.fromJSON({
			x: ['a', 'y', 'b', 'y', 'b', 'z']
		})

		assert.equal(graph.removeEdges('x', 'y'), true)
		assert.equal(graph.edgeCount(), 1)
	})

	QUnit.test('removeNode()', function (assert) {
		var graph = Graph.fromJSON({
			x: ['a', 'y', 'b', 'z'],
			z: ['a', 'x']
		})

		assert.ok(graph.removeNode('x'))
		assert.equal(graph.edgeCount(), 0)
	})

})