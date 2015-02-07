define(function (require) {
	var LinkedList = require('src/linear-list/linked-list')

	module('LinkedList')

	test('prev()/next()', function (assert) {
		var v1 = {}
		var v2 = {}

		var list = new LinkedList
		list.addLast(v1)
		assert.equal(list.prev(v1), null)
		assert.equal(list.next(v1), null)

		list.addLast(v2)
		assert.equal(list.prev(v1), null)
		assert.equal(list.next(v1), v2)
		assert.equal(list.prev(v2), v1)
		assert.equal(list.next(v2), null)
	})
})