define(function (require) {
	var Queue = require('cjs!src/linear-list/queue')

	QUnit.module('Queue')

	QUnit.test('isEmpty()', function (assert) {
		var q = new Queue
		assert.ok(q.isEmpty())

		q.inqueue(10)
		assert.ok(!q.isEmpty())
	})

	QUnit.test('peek()', function (assert) {
		var q = new Queue
		q.inqueue(10).inqueue(20)
		assert.equal(q.peek(), 10)
		assert.equal(q.peek(), 10)
	})

	QUnit.test('inqueue()/dequeue()', function (assert) {
		var q = new Queue
		q.inqueue(10).inqueue(20).inqueue(30)
		assert.equal(q.dequeue(), 10)
		assert.equal(q.dequeue(), 20)
		assert.equal(q.dequeue(), 30)
	})

	QUnit.test('count()', function (assert) {
		var q = new Queue
		assert.equal(q.count(), 0)

		q.inqueue(1)
		assert.equal(q.count(), 1)

		q.inqueue(2)
		q.inqueue(1)
		assert.equal(q.count(), 3)
	})

})