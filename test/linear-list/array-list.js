define(function (require) {
	var List = require('src/linear-list/array-list')

	module('ArrayList')

	test('accept primitive value', function (assert) {
		var list = new List
		list.addLast(0)
			.addLast(null)
			.addLast(undefined)
			.addLast(NaN)
			.addLast(false)
			.addLast('')
		assert.deepEqual(list.toArray(), [0, null, undefined, NaN, false, ''])
	})
})