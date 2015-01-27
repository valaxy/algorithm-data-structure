define(function (require) {
	var Set = require('src/set/set')

	module('Set')

	test('constructor', function (assert) {
		var s = new Set // use default compare
		assert.deepEqual(s.toArray(), [])

		s.add(1)
		s.add(2)
		s.add(true)
		assert.deepEqual(s.toArray(), [1, 2, true])

		var s = new Set(function (x, y) {
			return x == y
		})
		s.add(1)
		s.add(2)
		assert.ok(!s.add(true))
		assert.deepEqual(s.toArray(), [1, 2])
	})


	test('fromArray()/toArray()', function (assert) {
		// default
		var s = Set.fromArray([1, 2, 2, true])
		assert.deepEqual(s.toArray(), [1, 2, true])

		// not default
		s = Set.fromArray([1, 2, 2, true], function (x, y) {
			return x == y
		})
		assert.deepEqual(s.toArray(), [1, 2])

	})

	test('count()/isEmpty()', function (assert) {
		var s = new Set
		assert.equal(s.count(), 0)
		assert.ok(s.isEmpty())

		s.add(1)
		assert.equal(s.count(), 1)
		assert.ok(!s.isEmpty())

		s.add(2)
		assert.equal(s.count(), 2)
		assert.ok(!s.isEmpty()  )
	})

	test('has()', function (assert) {
		var s = new Set
		s.add(1)
		assert.ok(s.has(1))
		assert.ok(!s.has(true))

		var s = new Set(function (x, y) {
			return x == y
		})
		s.add(1)
		assert.ok(s.has(1))
		assert.ok(s.has(true))
	})

	test('hasOneOf()', function (assert) {
		var s = Set.fromArray([1, 2, 3])
		assert.ok(s.hasOneOf([3]))
		assert.ok(s.hasOneOf([1, 2]))
		assert.ok(s.hasOneOf([1, 10]))
		assert.ok(s.hasOneOf([0, 0, 0, 1]))
		assert.ok(!s.hasOneOf([10]))
		assert.ok(!s.hasOneOf([10, 20]))
	})

	test('hasAll()', function (assert) {
		var s = Set.fromArray([1, 2, 3])
		assert.ok(s.hasAll([1]))
		assert.ok(s.hasAll([1, 2]))
		assert.ok(s.hasAll([1, 1, 1, 1]))
		assert.ok(!s.hasAll([10]))
		assert.ok(!s.hasAll([1, 10]))
	})


	test('each()', function (assert) {
		var s = Set.fromArray([1, 2, 3])
		var i = 1
		assert.ok(!s.each(function (x) {
			assert.equal(x, i++)
		}))
		assert.equal(i, 4)
	})

	test('add()', function (assert) {
		var s = new Set
		assert.ok(s.add(1))
		assert.ok(!s.add(1))
		assert.ok(s.add(2))
		assert.ok(s.has(2))
		assert.ok(!s.has(3))
		assert.ok(!s.has(undefined))
		assert.ok(!s.has(null))
	})

	test('union()', function (assert) {
		var s = Set.fromArray([1, 2, 3])
		assert.deepEqual(s.union(Set.fromArray([])).toArray(), [1, 2, 3])
		assert.deepEqual(s.union(Set.fromArray([1, 4, 5])).toArray(), [1, 2, 3, 4, 5])
	})

	test('intersect()', function (assert) {
		// empty set
		var s = Set.fromArray([1, 2, 3])
		assert.deepEqual(s.intersect(Set.fromArray([])).toArray(), [])

		// no empty
		var s = Set.fromArray([1, 2, 3])
		assert.deepEqual(s.intersect(Set.fromArray([2, 3, 4, 5, 6])).toArray(), [2, 3])
	})

	test('remove()', function (assert) {
		var s = Set.fromArray([1, 2, 3])
		assert.ok(s.remove(2))
		assert.ok(!s.remove(true))
		assert.deepEqual(s.toArray(), [1, 3])
	})

	test('clear()', function (assert) {
		var s = Set.fromArray([1, 2, 3])
		assert.deepEqual(s.clear(), [1, 2, 3])
		assert.deepEqual(s.toArray(), [])
	})
})