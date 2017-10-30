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
    let g = serializer.buildByObject({
        a: [[0, 'd'], [0, 'c']],
        d: [[0, 'b']],
        c: [[0, 'b']]
    }, Graph, GraphNode)

    let [a, d, c, b] = g.nodes()
    assert.deepEqual(topologicalSort(g), [a, d, c, b])
})
