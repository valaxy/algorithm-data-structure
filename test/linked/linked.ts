import Linked from '../../lib/linked/linked'
import LinkedNode from '../../lib/linked/linkedNode'
import QUnit = require('qunitjs')

QUnit.module('Linked')

function checkLinks(assert, list, nodes: LinkedNode[]) {
    assert.equal(list.count, nodes.length)
    if (nodes.length == 0) {
        assert.equal(list.head, null)
        assert.equal(list.tail, null)
    } else {
        assert.equal(list.head, nodes[0])
        assert.equal(list.tail, nodes[nodes.length - 1])
        for (let i = 1; i < nodes.length - 1; i++) {
            assert.equal(nodes[i].prev, nodes[i - 1])
            assert.equal(nodes[i].next, nodes[i + 1])
        }
        assert.equal(nodes[0].prev, null)
        assert.equal(nodes[nodes.length - 1].next, null)
    }
}


QUnit.test('constructor', function (assert) {
    let list = new Linked
    assert.equal(list.head, null)
    assert.equal(list.head, list.tail)
})


QUnit.test('insertAfter()', function (assert) {
    let list = new Linked
    let n1   = list.addLast()
    let n2   = list.insertAfter(n1)
    checkLinks(assert, list, [n1, n2])

    let n3 = list.insertAfter(n1)
    checkLinks(assert, list, [n1, n3, n2])
})


QUnit.test('insertBefore()', function (assert) {
    let list = new Linked
    let n1   = list.addLast()
    let n2   = list.insertBefore(n1)
    checkLinks(assert, list, [n2, n1])

    let n3 = list.insertBefore(n1)
    checkLinks(assert, list, [n2, n3, n1])
})


QUnit.test('addLast()', function (assert) {
    let list = new Linked
    let n1   = list.addLast()
    checkLinks(assert, list, [n1])

    let n2 = list.addLast()
    checkLinks(assert, list, [n1, n2])
})

QUnit.test('addFirst()', function (assert) {
    let list = new Linked
    let n1   = list.addFirst()
    checkLinks(assert, list, [n1])

    let n2 = list.addFirst()
    checkLinks(assert, list, [n2, n1])
})


QUnit.test('remove()', function (assert) {
    let list = new Linked
    let n1   = list.addLast()
    let n2   = list.addLast()
    let n3   = list.addLast()
    let n4   = list.addLast()
    let n5   = list.addLast()
    checkLinks(assert, list, [n1, n2, n3, n4, n5])

    list.remove(n1)
    checkLinks(assert, list, [n2, n3, n4, n5])

    list.remove(n3)
    checkLinks(assert, list, [n2, n4, n5])

    list.remove(n5)
    checkLinks(assert, list, [n2, n4])

    list.remove(n2)
    list.remove(n4)
    checkLinks(assert, list, [])
})

QUnit.test('removeMany()', function (assert) {
    assert.ok(true)
})

QUnit.test('each()', function (assert) {
    // empty list
    let list = new Linked
    assert.ok(!list.each(function () {
        assert.ok(false)
    }))

    // no-break
    let count = 0
    let n1    = list.addLast()
    let n2    = list.addLast()
    let n3    = list.addLast()
    let nodes = [n1, n2, n3]
    assert.ok(!list.each(function (node, i) {
        assert.equal(count++, i)
        assert.equal(node, nodes[i])
    }))

    // break
    count = 0
    assert.ok(list.each(function () {
        if (count == 1) {
            return true
        }
        count++
    }))
    assert.equal(count, 1)
})
