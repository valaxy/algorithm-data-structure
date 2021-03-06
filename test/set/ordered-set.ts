import OrderedSet = require('../../lib/set/ordered-set')

QUnit.module('OrderedSet')

QUnit.test('fromArray()', function (assert) {
    var s = OrderedSet.fromArray([], function (x, y) {
        return x - y
    })
    assert.deepEqual(s.toArray(), [])

    var s = OrderedSet.fromArray([3, 1, 2], function (x, y) {
        return x - y
    })
    assert.deepEqual(s.toArray(), [1, 2, 3])
})

QUnit.test('index()', function (assert) {
    var s = OrderedSet.fromArray([0, 1, 2, 3, 4, 5], function (x, y) {
        return x - y
    })
    assert.equal(s.index(0), 0)
    assert.equal(s.index(5), 5)
    assert.equal(s.index(3), 3)
    assert.equal(s.index(10), -1)
    assert.equal(s.index(-10), -1)
    assert.equal(s.index(3.5), -1)

    // case1
    s = OrderedSet.fromArray([100], function (x, y) {
        return x - y
    })
    assert.equal(s.index(100), 0)
    assert.equal(s.index(10), -1)
    assert.equal(s.index(200), -1)

    // case2
    s = OrderedSet.fromArray([100, 200], function (x, y) {
        return x - y
    })
    assert.equal(s.index(100), 0)
    assert.equal(s.index(200), 1)
    assert.equal(s.index(-1), -1)
    assert.equal(s.index(150), -1)
    assert.equal(s.index(250), -1)
})


QUnit.test('has()', function (assert) {
    var s = OrderedSet.fromArray([0, 1, 2, 3, 4, 5], function (x, y) {
        return x - y
    })
    assert.ok(s.has(3))
    assert.ok(!s.has(100))
})


QUnit.test('add()', function (assert) {
    var s = new OrderedSet(function (x, y) {
        return x - y
    })
    assert.ok(s.add(10))   // add first element
    assert.ok(!s.add(10))  // repeat at first
    assert.ok(s.add(1))    // insert first element
    assert.ok(!s.add(1))   // repeat at first
    assert.ok(s.add(20))   // insert last element
    assert.ok(!s.add(20))  // repeat at last
    assert.ok(s.add(15))   // middle element
    assert.ok(!s.add(15))  // repeat at middle
    assert.deepEqual(s.toArray(), [1, 10, 15, 20])
})


QUnit.test('remove()', function (assert) {
    var s = OrderedSet.fromArray([1, 2, 3, 4, 5], function (x, y) {
        return x - y
    })

    assert.ok(s.remove(3))
    assert.ok(!s.remove(6))
    assert.deepEqual(s.toArray(), [1, 2, 4, 5])
})

QUnit.test('removeAt()', function (assert) {
    var s = OrderedSet.fromArray([1, 2, 3, 4, 5], function (x, y) {
        return x - y
    })

    s.removeAt(0)
    assert.deepEqual(s.toArray(), [2, 3, 4, 5])

    s.removeAt(3)
    assert.deepEqual(s.toArray(), [2, 3, 4,])

    s.removeAt(1)
    assert.deepEqual(s.toArray(), [2, 4])
})