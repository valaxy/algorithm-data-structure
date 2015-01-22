define(function (require, exports) {
	var Graph = require('src/directed-hash-graph')

	QUnit.module('DirectedHashGraph')

	QUnit.test('createFromHash()/nodes()/nodeCount()/edgeCount()/hasEdge()', function (assert) {
		var graph = new Graph()
		assert.deepEqual(graph.nodes(), [])
		assert.equal(graph.nodeCount(), 0)
		assert.equal(graph.edgeCount(), 0)

		graph = Graph.createFromHash({
			x: {
				'a': 'y',
				'b': 'z'
			},
			y: {
				'c': 'z'
			}
		})

		assert.deepEqual(graph.nodes(), ['x', 'y', 'z'])
		assert.equal(graph.nodeCount(), 3)
		assert.equal(graph.edgeCount(), 3)
		assert.ok(graph.hasEdge('x', 'y', 'a'))
		assert.ok(!graph.hasEdge('x', 'x', 'a'))
	})


	QUnit.test('addNode()', function (assert) {
		var graph = new Graph
		graph.addNode('x')
		graph.addNode('y')
		assert.deepEqual(graph.nodes(), ['x', 'y'])

		graph.addNode('x')
		assert.deepEqual(graph.nodes(), ['x', 'y'])
	})


	QUnit.test('addEdge()', function (assert) {
		var graph = new Graph
		graph.addEdge('x', 'y', 'a')
		assert.equal(graph.edgeCount(), 1)
		assert.equal(graph.nodeCount(), 2)

		graph.addEdge('y', 'x', 'b')
		assert.equal(graph.edgeCount(), 2)
		assert.equal(graph.nodeCount(), 2)
	})


	QUnit.test('forEachEdge()', function (assert) {
		var graph = Graph.createFromHash({
			x: {
				'a': 'y',
				'b': 'z'
			},
			y: {
				'c': 'z'
			},
			z: {
				'd': 'y'
			}
		})

		var i = 0
		var values = [
			['x', 'y', 'a'],
			['x', 'z', 'b'],
			['y', 'z', 'c'],
			['z', 'y', 'd']
		]
		graph.forEachEdge(function (from, to, edge) {
			assert.equal(from, values[i][0])
			assert.equal(to, values[i][1])
			assert.equal(edge, values[i++][2])
		})

		// test break
		var i = 0
		graph.forEachEdge(function () {
			i++
			if (i == 2) {
				return true
			}
		})
		assert.equal(i, 2)
	})


	QUnit.test('_compare()/isostructural()', function (assert) {
		var g1 = Graph.createFromHash({
			x: {
				a: 'y',
				b: 'x'
			},
			y: {
				c: 'z'
			},
			z: {
				d: 'x'
			}
		})
		var g2 = Graph.createFromHash({
			zz: {
				d: 'xx'
			},
			xx: {
				a: 'yy',
				b: 'xx'
			},
			yy: {
				c: 'zz'
			}
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