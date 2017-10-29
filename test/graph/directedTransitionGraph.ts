import Graph from '../../lib/graph/directedTransitionGraph'
import QUnit = require('qunitjs')

QUnit.module('DirectedTransitionGraph')


QUnit.test('fromJSON()/toJSON()', function (assert) {
    // common graph
    let graph = Graph.fromJSON({
        x : ['a', 'y', 'b', 'z'],
        y : ['c', 'z'],
        xx: []
    })
    assert.deepEqual(graph.toJSON(), {
        x : ['a', 'y', 'b', 'z'],
        y : ['c', 'z'],
        z : [],
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

QUnit.test('nodeCount()', function (assert) {
    let graph = new Graph
    assert.equal(graph.nodeCount(), 0)

    graph = Graph.fromJSON({
        x: ['a', 'z']
    })
    assert.equal(graph.nodeCount(), 2)
})

QUnit.test('edgeCount()', function (assert) {
    let graph = new Graph
    assert.equal(graph.edgeCount(), 0)

    graph = Graph.fromJSON({
        x: ['a', 'y'],
        y: ['a', 'x', 'b', 'y']
    })
    assert.equal(graph.edgeCount(), 3)
})

QUnit.test('eachNode()', function (assert) {
    let graph = Graph.fromJSON({
        '0': ['a', '1'],
        '1': ['b', '0']
    })

    let nodes = ['0', '1']

    // no break
    let i = 0
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

QUnit.test('eachEdge(): each all', function (assert) {
    let graph = Graph.fromJSON({
        x: ['a', 'y', 'b', 'z'],
        y: ['c', 'z'],
        z: ['d', 'y']
    })

    let edges = [
        ['x', 'y', 'a'],
        ['x', 'z', 'b'],
        ['y', 'z', 'c'],
        ['z', 'y', 'd']
    ]

    // no break
    let i = 0
    assert.ok(!graph.eachEdge(function (from, to, edge) {
        assert.deepEqual([from, to, edge], edges[i++])
    }))
    assert.ok(i, edges.length)

    // test break
    i = 0
    assert.ok(graph.eachEdge(function () {
        i++
        if (i == 2) {
            return true
        }
    }))
    assert.equal(i, 2)
})

QUnit.test('eachEdge(): each a node', function (assert) {
    let graph = Graph.fromJSON({
        x: ['a', 'y', 'b', 'z', 'c', 'xx'],
        y: ['a', 'x', 'b', 'x']
    })

    let edges = [
        ['x', 'y', 'a'],
        ['x', 'z', 'b'],
        ['x', 'xx', 'c']
    ]

    // no break
    let i = 0
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

QUnit.test('hasNode()', function (assert) {
    let graph = Graph.fromJSON({
        x: ['a', 'y']
    })
    assert.ok(graph.hasNode('x'))
    assert.ok(graph.hasNode('y'))
    assert.ok(!graph.hasNode('z'))
})

QUnit.test('hasEdge()', function (assert) {
    let graph = Graph.fromJSON({
        x: ['a', 'y']
    })
    assert.ok(graph.hasEdge('x', 'y', 'a'))
    assert.ok(!graph.hasEdge('y', 'x', 'a'))
})

QUnit.test('addNode()', function (assert) {
    let graph = new Graph
    graph.addNode('x')
    assert.ok(graph.hasNode('x'))
    assert.equal(graph.nodeCount(), 1)

    graph.addNode('x')
    assert.equal(graph.nodeCount(), 1)
})

QUnit.test('addEdge()', function (assert) {
    let graph = new Graph
    graph.addEdge('x', 'y', 'a')
    assert.equal(graph.edgeCount(), 1)
    assert.equal(graph.nodeCount(), 2)
    assert.ok(graph.hasEdge('x', 'y', 'a'))

    graph.addEdge('y', 'x', 'b')
    assert.equal(graph.edgeCount(), 2)
    assert.equal(graph.nodeCount(), 2)
    assert.ok(graph.hasEdge('y', 'x', 'b'))
})

QUnit.test('removeNode()', function (assert) {
    let graph = Graph.fromJSON({
        x: [],
        y: ['a', 'y']
    })


    assert.ok(graph.removeNode('x'))
    assert.equal(graph.nodeCount(), 1)

    assert.ok(!graph.removeNode('y'), 'not a alone node')
    assert.ok(!graph.removeNode('z'), 'not a exist node')
})


QUnit.test('transfer()', function (assert) {
    let graph = Graph.fromJSON({
        '0': ['a', '1']
    })

    assert.equal(graph.transfer('0', 'a'), '1', 'common transfer')
    assert.equal(graph.transfer('0', 'b'), null, 'no exist edge')
    assert.equal(graph.transfer('1', 'a'), null, 'no exist `from` node')
})

QUnit.test('_compare()/isostructural()', function (assert) {
    let g1 = Graph.fromJSON({
        x: ['a', 'y', 'b', 'x'],
        y: ['c', 'z'],
        z: ['d', 'x']
    })
    let g2 = Graph.fromJSON({
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
