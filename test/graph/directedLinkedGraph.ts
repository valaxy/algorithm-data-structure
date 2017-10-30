import Graph from '../../lib/graph/directedLinkedGraph'
import QUnit = require('qunitjs')

QUnit.module('DirectedLinkedGraph')

QUnit.test('fromJSON()/toJSON()', function (assert) {
    let def   = {
        '1': ['a', '2'],
        '2': ['b', '3', 'c', '4'],
        '3': ['a', '1'],
        '4': ['4', '4'],
        '5': [] // empty
    }
    let graph = Graph.fromJSON(def)
    assert.deepEqual(graph.toJSON(), def)
})

QUnit.test('edgeCount()/hasEdge(): complex case', function (assert) {
    let graph = Graph.fromJSON({
        'a': ['1', 'b', '2', 'b', '1', 'c', '3', 'c'],
        'b': ['1', 'c', '2', 'b'] // a loop
    })

    assert.equal(graph.edgeCount(undefined, undefined, undefined), 6)
    assert.equal(graph.edgeCount(undefined, undefined, '1'), 3)
    assert.equal(graph.edgeCount(undefined, 'b', undefined), 3)
    assert.equal(graph.edgeCount(undefined, 'b', '1'), 1)
    assert.equal(graph.edgeCount('a', undefined, undefined), 4)
    assert.equal(graph.edgeCount('a', undefined, '1'), 2)
    assert.equal(graph.edgeCount('a', 'b', undefined), 2)
    assert.equal(graph.edgeCount('a', 'b', '1'), 1)

    assert.ok(graph.hasEdge(undefined, undefined, undefined))
    assert.ok(graph.hasEdge(undefined, undefined, '1'))
    assert.ok(graph.hasEdge(undefined, 'b', undefined))
    assert.ok(graph.hasEdge(undefined, 'b', '1'))
    assert.ok(graph.hasEdge('a', undefined, undefined))
    assert.ok(graph.hasEdge('a', undefined, '1'))
    assert.ok(graph.hasEdge('a', 'b', undefined))
    assert.ok(graph.hasEdge('a', 'b', '1'))
    assert.ok(!graph.hasEdge('a', 'b', '3'))
})





QUnit.test('hasNode()', function (assert) {
    let graph = new Graph
    graph.addEdge('x', 'y', 'a')
    assert.ok(graph.hasNode('x'))
    assert.ok(!graph.hasNode('a'))
})

QUnit.test('eachEdge()', function (assert) {
    let graph = new Graph

    // empty
    assert.ok(!graph.eachEdge(function (from, to, edge) {
        assert.ok(false)
    }))

    // no empty, no break
    graph.addEdge('x', 'y', 'a')
    graph.addEdge('x', 'y', 'a')
    graph.addEdge('y', 'z', 'b')

    let edges = [
        ['x', 'y', 'a'],
        ['x', 'y', 'a'],
        ['y', 'z', 'b']
    ]
    let i     = 0
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
    let graph1 = new Graph
    graph1.addEdge('x', 'y', 'a')
    graph1.addEdge('x', 'y', 'a') // same edge
    graph1.addEdge('y', 'z', 'c')
    graph1.addEdge('y', 'x', 'd')
    graph1.addEdge('z', 'z', 'a') // link to itself

    let graph2 = new Graph
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
