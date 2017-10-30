// import Graph from '../../lib/graph/directedLinkedGraph/graph'
// import QUnit = require('qunitjs')
//
// QUnit.module('DirectedLinkedGraph')
//
// QUnit.test('fromJSON()/toJSON()', function (assert) {
//     let def   = {
//         '1': ['a', '2'],
//         '2': ['b', '3', 'c', '4'],
//         '3': ['a', '1'],
//         '4': ['4', '4'],
//         '5': [] // empty
//     }
//     let graph = Graph.fromJSON(def)
//     assert.deepEqual(graph.toJSON(), def)
// })
//
// QUnit.test('edgeCount()/hasEdge(): complex case', function (assert) {
//     let graph = Graph.fromJSON({
//         'a': ['1', 'b', '2', 'b', '1', 'c', '3', 'c'],
//         'b': ['1', 'c', '2', 'b'] // a loop
//     })
//
//     assert.equal(graph.edgeCount(undefined, undefined, undefined), 6)
//     assert.equal(graph.edgeCount(undefined, undefined, '1'), 3)
//     assert.equal(graph.edgeCount(undefined, 'b', undefined), 3)
//     assert.equal(graph.edgeCount(undefined, 'b', '1'), 1)
//     assert.equal(graph.edgeCount('a', undefined, undefined), 4)
//     assert.equal(graph.edgeCount('a', undefined, '1'), 2)
//     assert.equal(graph.edgeCount('a', 'b', undefined), 2)
//     assert.equal(graph.edgeCount('a', 'b', '1'), 1)
//
//     assert.ok(graph.hasEdge(undefined, undefined, undefined))
//     assert.ok(graph.hasEdge(undefined, undefined, '1'))
//     assert.ok(graph.hasEdge(undefined, 'b', undefined))
//     assert.ok(graph.hasEdge(undefined, 'b', '1'))
//     assert.ok(graph.hasEdge('a', undefined, undefined))
//     assert.ok(graph.hasEdge('a', undefined, '1'))
//     assert.ok(graph.hasEdge('a', 'b', undefined))
//     assert.ok(graph.hasEdge('a', 'b', '1'))
//     assert.ok(!graph.hasEdge('a', 'b', '3'))
// })
