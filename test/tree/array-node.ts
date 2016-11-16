var ArrayNode = require('src/tree/array-node')

QUnit.module('ArrayNode')

QUnit.test('child()/addChildAt()', function (assert) {
    var root = ArrayNode.create()
    var n0   = ArrayNode.create()
    var n1   = ArrayNode.create()
    var n2   = ArrayNode.create()
    root.addChildLast(n1)
    root.addChildAt(1, n2)
    root.addChildAt(0, n0)

    assert.equal(root.child(0), n0)
    assert.equal(root.child(1), n1)
    assert.equal(root.child(2), n2)
    assert.equal(n2.parent(), root)
})
