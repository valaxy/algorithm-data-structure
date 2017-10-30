import LinkedGraph     from '../../lib/graph/directedLinkedGraph/graph'
import LinkedGraphNode from '../../lib/graph/directedLinkedGraph/graphNode'
import TransitionGraph from '../../lib/graph/directedTransitionGraph/graph'
import TransitionGraphNode from '../../lib/graph/directedTransitionGraph/graphNode'
import Graph from '../../lib/graph/graph'
import GraphNode from '../../lib/graph/graphNode'
import GraphSerializer from '../../lib/graph/graphSerializer'
import QUnit = require('qunitjs')

const Graphs = [LinkedGraph, TransitionGraph]
const GraphNodes = [LinkedGraphNode, TransitionGraphNode]
const serializer = new GraphSerializer

for (let i=0; i<Graphs.length; i++) {
    const Graph     = Graphs[i] as { new<N extends GraphNode<E>, E>(): Graph<N, E> }
    const GraphNode = GraphNodes[i] as { new<E>(): GraphNode<E> }

    QUnit.module((Graph as any).name)

    QUnit.test('addNode()/nodeCount()/nodes()', function (assert) {
        let graph = new Graph

        // empty nodes
        assert.deepEqual(graph.nodes(), [])
        assert.equal(graph.nodeCount(), 0)

        // no empty nodes
        let x = graph.addNode(new GraphNode)
        let y = graph.addNode(new GraphNode)
        assert.deepEqual(graph.nodes(), [x, y])
        assert.equal(graph.nodeCount(), 2)
    })

    QUnit.test('addEdge()/edgeCount()', function (assert) {
        let graph = new Graph

        // empty
        assert.equal(graph.edgeCount(), 0)

        // no empty
        let x = graph.addNode(new GraphNode)
        let y = graph.addNode(new GraphNode)
        graph.addEdge(x, y, 'a')
        assert.equal(graph.edgeCount(), 1)
        assert.equal(graph.findEdges((from, to, edge) => from === x && to === y && edge === 'a').length, 1)

        graph.addEdge(y, x, 'b')
        assert.equal(graph.edgeCount(), 2)
        assert.equal(graph.findEdges((from, to, edge) => from === x && to === y && edge === 'b').length, 0)
    })


    QUnit.test('findEdges()', function (assert) {
        let g = new Graph
        let x = g.addNode(new GraphNode)
        let y = g.addNode(new GraphNode)
        let z = g.addNode(new GraphNode)

        // repeat value edge
        g.addEdge(x, y, 'a')
        g.addEdge(y, x, 'a')
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
        let [graph] = serializer.buildByObject({
            x: [['a', 'y'], ['b', 'z']],
            z: [['a', 'x']]
        }, Graph, GraphNode)

        let [x, y, z] = graph.nodes()
        assert.equal(graph.edgeCount(), 3)
        assert.ok(graph.removeNode(x))
        assert.equal(graph.edgeCount(), 0)
        assert.ok(!graph.removeNode(x))
        assert.ok(graph.removeNode(y))
        assert.ok(graph.removeNode(z))
    })

    QUnit.test('removeEdges()', function (assert) {
        let [graph] = serializer.buildByObject({
            'a': [[1, 'b'], [2, 'b'], [1, 'c'], [3, 'c']],
            'b': [[2, 'c'], [1, 'b']], // a loop
            'c': [[2, 'b'], [3, 'a']]
        }, Graph, GraphNode)
        let [a, b, c] = graph.nodes()
        assert.equal(graph.edgeCount(), 8)
        graph.removeEdges((from, to, edge) => from === a || to === b || edge == 2)
        assert.equal(graph.edgeCount(), 1)
        assert.deepEqual(graph.findEdge(() => true), [c, a, 3])
    })


    QUnit.test('hasNode()', function(assert) {
        let [graph] = serializer.buildByObject({
            x: [[0, 'y']],
            y: [[0, 'x']]
        }, Graph, GraphNode)

        let [x, y] = graph.nodes()
        assert.ok(graph.hasNode(x))
        assert.ok(graph.hasNode(y))

        graph.removeNode(y)
        assert.ok(graph.hasNode(x))
        assert.ok(!graph.hasNode(y))
    })



    QUnit.test('findEdges()/findEdge()', function(assert) {
        let [graph] = serializer.buildByObject({
            a: [[0, 'b'], [1, 'c']],
            b: [[0, 'c']]
        }, Graph, GraphNode)

        let [a, b, c] = graph.nodes()
        assert.deepEqual(graph.findEdges((from, to, edge) => edge === 0), [
            [a, b, 0],
            [b, c, 0]
        ])
        assert.deepEqual(graph.findEdge((from, to, edge) => from === a && to === c), [a, c, 1])
    })

    QUnit.test('eachNode()', function (assert) {
        let graph = new Graph

        // empty nodes
        assert.ok(!graph.eachNode(function () {
            assert.ok(false)
        }))

        // not empty, no break
        let x = graph.addNode(new GraphNode)
        let y = graph.addNode(new GraphNode)
        let z = graph.addNode(new GraphNode)
        let nodes = []
        assert.ok(!graph.eachNode(function (node) {
            nodes.push(node)
        }))
        assert.deepEqual(nodes, [x, y, z])

        // break
        let theNode = null
        assert.ok(graph.eachNode((node) => {
            if (node == nodes[1]) {
                theNode = node
                return true
            }
        }))
        assert.equal(theNode, nodes[1])
    })


    QUnit.test('eachEdge()', function (assert) {
        let graph = new Graph

        // empty
        assert.ok(!graph.eachEdge((from, to, edge) => {
            assert.ok(false)
        }))

        // no empty, no break
        let x = graph.addNode(new GraphNode)
        let y = graph.addNode(new GraphNode)
        let z = graph.addNode(new GraphNode)
        graph.addEdge(x, y, 'a')
        graph.addEdge(x, y, 'a')
        graph.addEdge(y, z, 'b')

        let edges = [
            [x, y, 'a'],
            [x, y, 'a'],
            [y, z, 'b']
        ]
        let i = 0
        assert.ok(!graph.eachEdge((from, to, edge) => {
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
    })

    // TODO edges
    // TODO toJSON
}


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
