import QUnit = require('qunitjs')
import Graph from '../../lib/graph/directedLinkedGraph/graph'
import GraphNode from '../../lib/graph/directedLinkedGraph/graphNode'
import GraphSerializer from '../../lib/graph/graphSerializer'
import topologicalSort from '../../lib/graph/alg/topologicalSort'

QUnit.module('topologicalSort')

interface TestGraphNode {
    name: string
}

const addNode = function(g, name): TestGraphNode {
    let node = g.addNode()
    node.name = name
    return node
}


QUnit.test('kk', function(assert) {
    let serializer = new GraphSerializer
    let [g, nameToNode] = serializer.buildByObject({
        a: [[0, 'd'], [1, 'c']],
        d: [[2, 'b']],
        c: [[3, 'b']]
    }, Graph, GraphNode)

    let {a, b, c, d} = nameToNode
    assert.deepEqual(topologicalSort(g), [a, d, c, b])
})
