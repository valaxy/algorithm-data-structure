var BinaryNode = require('src/tree/binary-node')

var root = new BinaryNode
var n1   = new BinaryNode
var n2   = new BinaryNode
var n3   = new BinaryNode
var n4   = new BinaryNode
var collector

QUnit.module('BinaryNode', {
    beforeEach: function () {
        collector = []
        root.setChildren(n1, n2)
        n1.setChildren(n3, null)
        n2.setChildren(null, n4)
    }
})


function collectNode(node) {
    collector.push(node)
}


QUnit.test('preorderWalk()', function (assert) {
    assert.ok(!root.preorderWalk(collectNode))
    assert.deepEqual(collector, [root, n1, n3, n2, n4])
})

QUnit.test('inorderWalk()', function (assert) {
    assert.ok(!root.inorderWalk(collectNode))
    assert.deepEqual(collector, [n3, n1, root, n2, n4])
})

QUnit.test('postorderWalk()', function (assert) {
    assert.ok(!root.postorderWalk(collectNode))
    assert.deepEqual(collector, [n3, n1, n4, n2, root])
})

QUnit.test('preorderWalk(): break', function (assert) {
    assert.ok(root.preorderWalk(function () {
        return true
    }))
})