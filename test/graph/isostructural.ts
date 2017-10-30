// QUnit.test('_compare()/isostructural()', function (assert) {
//     let graph1 = new Graph
//     graph1.addEdge('x', 'y', 'a')
//     graph1.addEdge('x', 'y', 'a') // same edge
//     graph1.addEdge('y', 'z', 'c')
//     graph1.addEdge('y', 'x', 'd')
//     graph1.addEdge('z', 'z', 'a') // link to itself
//
//     let graph2 = new Graph
//     graph2.addEdge('yy', 'xx', 'd')
//     graph2.addEdge('zz', 'zz', 'a')
//     graph2.addEdge('xx', 'yy', 'a')
//     graph2.addEdge('xx', 'yy', 'a')
//     graph2.addEdge('yy', 'zz', 'c')
//
//     assert.ok(graph1._compare(graph2, {
//         x: 'xx',
//         y: 'yy',
//         z: 'zz'
//     }))
//     assert.ok(!graph1._compare(graph2, {
//         x: 'yy',
//         y: 'xx',
//         z: 'zz'
//     }))
//
//     assert.ok(graph1.isostructural(graph1))
//     assert.ok(graph1.isostructural(graph2))
//
//     graph1.addEdge('x', 'z', '1')
//     graph2.addEdge('xx', 'yy', '2')
//     assert.ok(!graph1.isostructural(graph2))
// })


// QUnit.test('_compare()/isostructural()', function (assert) {
//     let g1 = Graph.fromJSON({
//         x: ['a', 'y', 'b', 'x'],
//         y: ['c', 'z'],
//         z: ['d', 'x']
//     })
//     let g2 = Graph.fromJSON({
//         xx: ['a', 'yy', 'b', 'xx'],
//         yy: ['c', 'zz'],
//         zz: ['d', 'xx']
//     })
//
//     assert.ok(g1._compare(g1, {
//         x: 'x',
//         y: 'y',
//         z: 'z'
//     }))
//     assert.ok(!g1._compare(g1, {
//         x: 'y',
//         y: 'x',
//         z: 'z'
//     }))
//     assert.ok(g1._compare(g2, {
//         x: 'xx',
//         y: 'yy',
//         z: 'zz'
//     }))
//     assert.ok(!g1._compare(g2, {
//         x: 'zz',
//         y: 'xx',
//         z: 'yy'
//     }))
//
//     // isostructural
//     assert.ok(g1.isostructural(g1))
//     assert.ok(g1.isostructural(g2))
//
//     g1.addEdge('z', 'x', 'a')
//     assert.ok(!g1.isostructural(g2))
//     assert.ok(!g2.isostructural(g1))
// })
