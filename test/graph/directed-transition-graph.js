define(function (require) {
	var Graph = require('cjs!src/graph/directed-transition-graph')

	QUnit.module('DirectedTransitionGraph')


	test('fromJSON()/toJSON()', function (assert) {
		// common graph
		var graph = Graph.fromJSON({
			x: ['a', 'y', 'b', 'z'],
			y: ['c', 'z'],
			xx: []
		})
		assert.deepEqual(graph.toJSON(), {
			x: ['a', 'y', 'b', 'z'],
			y: ['c', 'z'],
			z: [],
			xx: []
		})


		// repeat edge graph
		graph = Graph.fromJSON({
			x: ['a', 'y', 'a', 'z'], // repeat edge value
			y: ['a', 'x', 'b', 'x'], // repeat `to` node
			z: []
		})
		assert.deepEqual(graph.toJSON(), {
			x: ['a', 'z'],
			y: ['a', 'x', 'b', 'x'],
			z: []
		})
	})

	test('nodeCount()', function (assert) {
		var graph = new Graph
		assert.equal(graph.nodeCount(), 0)

		graph = Graph.fromJSON({
			x: ['a', 'z']
		})
		assert.equal(graph.nodeCount(), 2)
	})

	test('edgeCount()', function (assert) {
		var graph = new Graph
		assert.equal(graph.edgeCount(), 0)

		graph = Graph.fromJSON({
			x: ['a', 'y'],
			y: ['a', 'x', 'b', 'y']
		})
		assert.equal(graph.edgeCount(), 3)
	})

	test('eachNode()', function (assert) {
		var graph = Graph.fromJSON({
			'0': ['a', '1'],
			'1': ['b', '0']
		})

		var nodes = ['0', '1']

		// no break
		var i = 0
		assert.ok(!graph.eachNode(function (node) {
			assert.equal(nodes[i++], node)
		}))
		assert.equal(i, 2)

		// break
		i = 0
		assert.ok(graph.eachNode(function () {
			if (i == 1) {
				return true
			}
			i++
		}))
		assert.equal(i, 1)
	})

	test('eachEdge(): each all', function (assert) {
		var graph = Graph.fromJSON({
			x: ['a', 'y', 'b', 'z'],
			y: ['c', 'z'],
			z: ['d', 'y']
		})

		var edges = [
			['x', 'y', 'a'],
			['x', 'z', 'b'],
			['y', 'z', 'c'],
			['z', 'y', 'd']
		]

		// no break
		var i = 0
		assert.ok(!graph.eachEdge(function (from, to, edge) {
			assert.deepEqual([from, to, edge], edges[i++])
		}))
		assert.ok(i, edges.length)

		// test break
		var i = 0
		assert.ok(graph.eachEdge(function () {
			i++
			if (i == 2) {
				return true
			}
		}))
		assert.equal(i, 2)
	})

	test('eachEdge(): each a node', function (assert) {
		var graph = Graph.fromJSON({
			x: ['a', 'y', 'b', 'z', 'c', 'xx'],
			y: ['a', 'x', 'b', 'x']
		})

		var edges = [
			['x', 'y', 'a'],
			['x', 'z', 'b'],
			['x', 'xx', 'c']
		]

		// no break
		var i = 0
		assert.ok(!graph.eachEdge(function (from, to, edge) {
			assert.deepEqual([from, to, edge], edges[i++])
		}, 'x'))
		assert.equal(i, edges.length)

		// break
		i = 0
		assert.ok(graph.eachNode(function () {
			if (i == 1) {
				return true
			}
			i++
		}))
		assert.equal(i, 1)
	})

	test('hasNode()', function (assert) {
		var graph = Graph.fromJSON({
			x: ['a', 'y']
		})
		assert.ok(graph.hasNode('x'))
		assert.ok(graph.hasNode('y'))
		assert.ok(!graph.hasNode('z'))
	})

	test('hasEdge()', function (assert) {
		var graph = Graph.fromJSON({
			x: ['a', 'y']
		})
		assert.ok(graph.hasEdge('x', 'y', 'a'))
		assert.ok(!graph.hasEdge('y', 'x', 'a'))
	})

	test('addNode()', function (assert) {
		var graph = new Graph
		graph.addNode('x')
		assert.ok(graph.hasNode('x'))
		assert.equal(graph.nodeCount(), 1)

		graph.addNode('x')
		assert.equal(graph.nodeCount(), 1)
	})

	test('addEdge()', function (assert) {
		var graph = new Graph
		graph.addEdge('x', 'y', 'a')
		assert.equal(graph.edgeCount(), 1)
		assert.equal(graph.nodeCount(), 2)
		assert.ok(graph.hasEdge('x', 'y', 'a'))

		graph.addEdge('y', 'x', 'b')
		assert.equal(graph.edgeCount(), 2)
		assert.equal(graph.nodeCount(), 2)
		assert.ok(graph.hasEdge('y', 'x', 'b'))
	})

	test('removeNode()', function (assert) {
		var graph = Graph.fromJSON({
			x: [],
			y: ['a', 'y']
		})


		assert.ok(graph.removeNode('x'))
		assert.equal(graph.nodeCount(), 1)

		assert.ok(!graph.removeNode('y'), 'not a alone node')
		assert.ok(!graph.removeNode('z'), 'not a exist node')
	})

	test('removeEdge()', function (assert) {
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
	})

	test('transfer()', function (assert) {
		var graph = Graph.fromJSON({
			'0': ['a', '1']
		})

		assert.equal(graph.transfer('0', 'a'), '1', 'common transfer')
		assert.equal(graph.transfer('0', 'b'), null, 'no exist edge')
		assert.equal(graph.transfer('1', 'a'), null, 'no exist `from` node')
	})

	test('_compare()/isostructural()', function (assert) {
		var g1 = Graph.fromJSON({
			x: ['a', 'y', 'b', 'x'],
			y: ['c', 'z'],
			z: ['d', 'x']
		})
		var g2 = Graph.fromJSON({
			xx: ['a', 'yy', 'b', 'xx'],
			yy: ['c', 'zz'],
			zz: ['d', 'xx']
		})

		assert.ok(g1._compare(g1, {
			x: 'x',
			y: 'y',
			z: 'z'
		}))
		assert.ok(!g1._compare(g1, {
			x: 'y',
			y: 'x',
			z: 'z'
		}))
		assert.ok(g1._compare(g2, {
			x: 'xx',
			y: 'yy',
			z: 'zz'
		}))
		assert.ok(!g1._compare(g2, {
			x: 'zz',
			y: 'xx',
			z: 'yy'
		}))

		// isostructural
		assert.ok(g1.isostructural(g1))
		assert.ok(g1.isostructural(g2))

		g1.addEdge('z', 'x', 'a')
		assert.ok(!g1.isostructural(g2))
		assert.ok(!g2.isostructural(g1))
	})


})