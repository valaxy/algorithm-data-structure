define(function (require) {
	var fullPermutation = require('cjs!lib/graph/full-permutation')

	QUnit.module('full-permutation')

	QUnit.test('fullPermutation()', function (assert) {
		fullPermutation([], function () {
			assert.ok(false)
		})

		fullPermutation([1], function (elements) {
			assert.deepEqual(elements, [1])
		})


		var perms = [
			[1, 2, 3, 4],
			[1, 2, 4, 3],
			[1, 3, 2, 4],
			[1, 3, 4, 2],
			[1, 4, 3, 2],
			[1, 4, 2, 3],

			[2, 1, 3, 4],
			[2, 1, 4, 3],
			[2, 3, 1, 4],
			[2, 3, 4, 1],
			[2, 4, 3, 1],
			[2, 4, 1, 3],

			[3, 2, 1, 4],
			[3, 2, 4, 1],
			[3, 1, 2, 4],
			[3, 1, 4, 2],
			[3, 4, 1, 2],
			[3, 4, 2, 1],

			[4, 2, 3, 1],
			[4, 2, 1, 3],
			[4, 3, 2, 1],
			[4, 3, 1, 2],
			[4, 1, 3, 2],
			[4, 1, 2, 3]
		]

		var i = 0
		fullPermutation([1, 2, 3, 4], function (elements) {
			assert.deepEqual(elements, perms[i++])
		})

		assert.equal(i, 24)
	})
})