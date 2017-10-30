import LinkedGraph     from '../../lib/graph/directedLinkedGraph/graph'
import TransitionGraph from '../../lib/graph/directedTransitionGraph/graph'
import GraphSerializer from '../../lib/graph/graphSerializer'
import BaseGraph       from '../../lib/graph/graph'
import QUnit = require('qunitjs')

const Graphs = [LinkedGraph, /*TransitionGraph*/]

for (let i in Graphs) {
    let Graph = Graphs[i]
    let serializer = new GraphSerializer

    QUnit.module((Graph as any).name)

    QUnit.test('addNode()/nodes()/nodeCount()', function (assert) {
        let graph = new Graph

        // empty nodes
        assert.deepEqual(graph.nodes(), [])
        assert.equal(graph.nodeCount(), 0)

        // no empty nodes
        let x = graph.addNode()
        let y = graph.addNode()
        assert.deepEqual(graph.nodes(), [x, y])
        assert.equal(graph.nodeCount(), 2)
    })

    QUnit.test('addEdge()/edgeCount()/findEdges(): simple case', function (assert) {
        let g = new Graph

        // empty
        assert.equal(g.edgeCount(), 0)

        // no empty
        let x = g.addNode()
        let y = g.addNode()
        g.addEdge(x, y, 'a')
        g.addEdge(y, x, 'a')
        assert.equal(g.edgeCount(), 2)
        assert.equal(g.findEdges((from, to, edge) => from === x && to === y && edge === 'a').length, 1)
        assert.equal(g.findEdges((from, to, edge) => from === x && to === y && edge === 'b').length, 0)

        // repeat value edge
        let z = g.addNode()
        g.addEdge(x, z, 'a')
        assert.equal(g.edgeCount(), 3)

        // repeat to-node
        g.addEdge(x, z, 'b')
        assert.equal(g.edgeCount(), 4)

        // same edge
        g.addEdge(x, z, 'b')
        assert.equal(g.edgeCount(), 5)
        assert.equal(g.findEdges((from, to, edge) => from === x && to === z && edge === 'b').length, 2)
    })

    QUnit.test('removeNode()', function (assert) {
        let graph = serializer.buildByObject({
            x: [['a', 'y'], ['b', 'z']],
            z: [['a', 'x']]
        }, new Graph)

        let [x, y, z] = graph.nodes()
        assert.equal(graph.edgeCount(), 3)
        assert.ok(graph.removeNode(x))
        assert.equal(graph.edgeCount(), 0)
        assert.ok(!graph.removeNode(x))
        assert.ok(graph.removeNode(y))
        assert.ok(graph.removeNode(z))
    })

    QUnit.test('removeEdges()', function (assert) {
        let createGraph = function () {
            return serializer.buildByObject({
                'a': [[1, 'b'], [2, 'b'], [1, 'c'], [3, 'c']],
                'b': [[2, 'c'], [1, 'b']], // a loop
                'c': [[2, 'b'], [3, 'a']]
            }, new Graph)
        }

        let graph = createGraph()
        let [a, b, c] = graph.nodes()
        assert.equal(graph.edgeCount(), 8)
        graph.removeEdges((from, to, edge) => from === a || to === b || edge == 2)
        assert.equal(graph.edgeCount(), 1)
        assert.deepEqual(graph.findEdge(() => true), [c, a, 3])
    })
}





// QUnit.test('eachNode()', function (assert) {
//     for (let i in Graphs) {
//         let Graph = Graphs[i]
//         let graph = new Graph
//
//         // empty nodes
//         assert.ok(!graph.eachNode(function () {
//             assert.ok(false)
//         }))
//
//         // not empty, no break
//         let x = graph.addNode()
//         let y = graph.addNode()
//         let z = graph.addNode()
//         let nodes = []
//         assert.ok(!graph.eachNode(function (node) {
//             nodes.push(node)
//         }))
//         assert.deepEqual(nodes, ['x', 'y', 'z'])
//
//         // break
//         let theNode = null
//         assert.ok(graph.eachNode(function (node) {
//             if (node == nodes[1]) {
//                 theNode = node
//                 return true
//             }
//         }))
//         assert.equal(theNode, nodes[1])
//     }
// })
//
//
//
// QUnit.test('removeEdge()', function (assert) {
//     for (let i in Graphs) {
//         let Graph = Graphs[i]
//
//         let graph = Graph.fromJSON({
//             x: ['a', 'y', 'b', 'z']
//         })
//
//         // common
//         assert.ok(graph.removeEdge('x', 'y', 'a'))
//         assert.ok(!graph.hasEdge('x', 'y', 'a'))
//         assert.equal(graph.edgeCount(), 1)
//
//         // no exist `value`
//         assert.ok(!graph.removeEdge('x', 'z', 'a'))
//         assert.equal(graph.edgeCount(), 1)
//
//         // no exist `to`
//         assert.ok(!graph.removeEdge('x', 'y', 'b'))
//         assert.equal(graph.edgeCount(), 1)
//
//         // no exist `from`
//         assert.ok(!graph.removeEdge('xx', 'z', 'b'))
//         assert.equal(graph.edgeCount(), 1)
//     }
// })
//
//

// QUnit.test('changeNodes()', function (assert) {
//     for (let i in Graphs) {
//         let Graph = Graphs[i]
//
//         let graph1 = Graph.fromJSON({
//             '1': ['a', '2'],
//             '2': ['b', '3'],
//             '3': ['c', '4']
//         })
//         let graph2 = Graph.fromJSON({
//             '1': ['a', '2'],
//             '2': ['b', '3'],
//             '3': ['c', '4']
//         })
//         graph2.changeNodes({
//             '1': '3',
//             '3': '2',
//             '2': '1'
//         })
//
//         assert.ok(graph2.hasEdge('3', '1', 'a'))
//         assert.ok(!graph2.hasEdge('1', '2', 'a'))
//         assert.ok(graph1.isostructural(graph2))
//     }
// })
