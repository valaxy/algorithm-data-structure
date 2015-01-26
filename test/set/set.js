define(function (require) {
	var Set = require('src/set')

	module('Set')

	test('add()/toArray()/canAdd()/has()', function (assert) {
		var s = new Set
		assert.deepEqual(s.toArray(), [])

		assert.ok(s.add(1))
		assert.ok(!s.add(1))
		assert.deepEqual(s.toArray(), [1])

		assert.ok(s.add(2))
		assert.deepEqual(s.toArray(), [1, 2])

		assert.ok(s.has(2))
		assert.ok(!s.has(3))
		assert.ok(!s.has(undefined))
		assert.ok(!s.has(null))
	})

	test('createByArray()', function (assert) {
		var a = [1, 2, 3]
		var s = Set.createByArray(a)
		assert.deepEqual(s.toArray(), a)

		a.push(4)
		assert.deepEqual(s.toArray(), [1, 2, 3])

		s = Set.createByArray([1, 2, 3, 1])
		assert.deepEqual(s.toArray(), [1, 2, 3])
	})

	test('hasOneOf()', function (assert) {
		var s = Set.createByArray([1, 2, 3])
		assert.ok(s.hasOneOf([3]))
		assert.ok(s.hasOneOf([1, 2]))
		assert.ok(s.hasOneOf([1, 10]))
		assert.ok(s.hasOneOf([0, 0, 0, 1]))
		assert.ok(!s.hasOneOf([10]))
		assert.ok(!s.hasOneOf([10, 20]))
	})

	test('hasAll()', function (assert) {
		var s = Set.createByArray([1, 2, 3])
		assert.ok(s.hasAll([1]))
		assert.ok(s.hasAll([1, 2]))
		assert.ok(s.hasAll([1, 1, 1, 1]))
		assert.ok(!s.hasAll([10]))
		assert.ok(!s.hasAll([1, 10]))
	})
})