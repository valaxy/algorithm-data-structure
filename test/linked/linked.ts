define(function (require) {
    var Linked = require('cjs!lib/linked/linked')

    QUnit.module('Linked')

    function checkLinks(assert, list, nodes) {
        assert.equal(list.count(), nodes.length)
        if (nodes.length == 0) {
            assert.equal(list.head(), null)
            assert.equal(list.tail(), null)
        } else {
            assert.equal(list.head(), nodes[0])
            assert.equal(list.tail(), nodes[nodes.length - 1])
            for (var i = 1; i < nodes.length - 1; i++) {
                assert.equal(nodes[i].prev(), nodes[i - 1])
                assert.equal(nodes[i].next(), nodes[i + 1])
            }
            assert.equal(nodes[0].prev(), null)
            assert.equal(nodes[nodes.length - 1].next(), null)
        }
    }


    QUnit.test('constructor', function (assert) {
        var list = new Linked
        assert.equal(list.head(), null)
        assert.equal(list.head(), list.tail())
    })


    QUnit.test('insertAfter()', function (assert) {
        var list = new Linked
        var n1   = list.addLast()
        var n2   = list.insertAfter(n1)
        checkLinks(assert, list, [n1, n2])

        var n3 = list.insertAfter(n1)
        checkLinks(assert, list, [n1, n3, n2])
    })


    QUnit.test('insertBefore()', function (assert) {
        var list = new Linked
        var n1   = list.addLast()
        var n2   = list.insertBefore(n1)
        checkLinks(assert, list, [n2, n1])

        var n3 = list.insertBefore(n1)
        checkLinks(assert, list, [n2, n3, n1])
    })


    QUnit.test('addLast()', function (assert) {
        var list = new Linked
        var n1   = list.addLast()
        checkLinks(assert, list, [n1])

        var n2 = list.addLast()
        checkLinks(assert, list, [n1, n2])
    })

    QUnit.test('addFirst()', function (assert) {
        var list = new Linked
        var n1   = list.addFirst()
        checkLinks(assert, list, [n1])

        var n2 = list.addFirst()
        checkLinks(assert, list, [n2, n1])
    })


    QUnit.test('remove()', function (assert) {
        var list = new Linked
        var n1   = list.addLast(1)
        var n2   = list.addLast(2)
        var n3   = list.addLast(3)
        var n4   = list.addLast(4)
        var n5   = list.addLast(5)
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
        var list = new Linked
        assert.ok(!list.each(function () {
            assert.ok(false)
        }))

        // no-break
        var count = 0
        var n1    = list.addLast(1)
        var n2    = list.addLast(2)
        var n3    = list.addLast(3)
        var nodes = [n1, n2, n3]
        assert.ok(!list.each(function (node, i) {
            assert.equal(count++, i)
            assert.equal(node, nodes[i])
        }))

        // break
        var count = 0
        assert.ok(list.each(function () {
            if (count == 1) {
                return true
            }
            count++
        }))
        assert.equal(count, 1)
    })
})