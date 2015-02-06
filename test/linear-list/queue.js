define(function (require) {
	var Queue = require('src/linear-list/queue')

	module('Queue')

	test('isEmpty()', function (assert) {
		var q = new Queue
		assert.ok(q.isEmpty())

		q.inqueue(10)
		assert.ok(!q.isEmpty())
	})

	test('peek()', function (assert) {
		var q = new Queue
		q.inqueue(10).inqueue(20)
		assert.equal(q.peek(), 10)
		assert.equal(q.peek(), 10)
	})

	test('inqueue()/dequeue()', function (assert) {
		var q = new Queue
		q.inqueue(10).inqueue(20).inqueue(30)
		assert.equal(q.dequeue(), 10)
		assert.equal(q.dequeue(), 20)
		assert.equal(q.dequeue(), 30)
	})

})