import QUnit = require('qunitjs')
import topologicalSort from '../../lib/graph/alg/topologicalSort'
import DirectedLinkedGraph from '../../lib/graph/directedLinkedGraph/graph'
import GraphSerializer from '../../lib/graph/graphSerializer'

QUnit.module('topologicalSort')

QUnit.test('kk', function(assert) {
    let serializer = new GraphSerializer
    let g = serializer.buildByObject({
        a: [[0, 'd'], [0, 'c']],
        d: [[0, 'b']],
        c: [[0, 'b']]
    }, new DirectedLinkedGraph)

    let [a, d, c, b] = g.nodes()
    topologicalSort(g)
    assert.deepEqual(topologicalSort(g as any), [a, d, c, b])
})
