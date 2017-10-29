import LinkedNode from '../../lib/linked/linkedNode'
import QUnit = require('qunitjs')

QUnit.module('LinkedNode')

QUnit.test('addnext/prev/next', function (assert) {
    let node = new LinkedNode
    assert.equal(node.next, null)
    assert.equal(node.prev, null)

    let node2 = new LinkedNode
    node.addNext(node2)
    assert.equal(node.prev, null)
    assert.equal(node.next, node2)
    assert.equal(node2.prev, node)
    assert.equal(node2.next, null)

    let node3 = new LinkedNode
    node.addNext(node3)
    assert.equal(node.next, node3)
    assert.equal(node3.prev, node)
    assert.equal(node3.next, node2)
    assert.equal(node2.prev, node3)
})

QUnit.test('addprev', function (assert) {
    let node  = new LinkedNode
    let node2 = new LinkedNode
    node.addPrev(node2)
    assert.equal(node.next, null)
    assert.equal(node.prev, node2)
    assert.equal(node2.next, node)
    assert.equal(node2.prev, null)

    let node3 = new LinkedNode
    node.addPrev(node3)
    assert.equal(node.prev, node3)
    assert.equal(node3.next, node)
    assert.equal(node3.prev, node2)
    assert.equal(node2.next, node3)
})

QUnit.test('remove()', function (assert) {
    // single node
    let node = new LinkedNode
    node.remove()
    assert.equal(node.prev, null)
    assert.equal(node.next, null)

    let n1 = new LinkedNode
    let n2 = new LinkedNode
    let n3 = new LinkedNode
    n1.addNext(n2)
    n2.addNext(n3)

    // middle node
    n2.remove()
    assert.equal(n1.next, n3)
    assert.equal(n3.prev, n1)
    assert.equal(n2.prev, null)
    assert.equal(n2.next, null)

    // left-head node
    n1.remove()
    assert.equal(n1.next, null)
    assert.equal(n3.prev, null)

    // right-head node
    n1.addNext(n2)
    n2.remove()
    assert.equal(n1.next, null)
    assert.equal(n2.prev, null)
})
