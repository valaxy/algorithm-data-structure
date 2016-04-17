define(function (require) {
	var LinkedList = require('cjs!lib/linear-list/linked-list')

	QUnit.module('LinkedList')

	QUnit.test('firstNode()/lastNode()', function (assert) {
		var v1 = {}
		var v2 = {}
		var v3 = {}

		var list = new LinkedList
		assert.equal(list.firstNode(), null)
		assert.equal(list.lastNode(), null)

		list.addLast(v1)
		assert.equal(list.getValue(list.firstNode()), v1)
		assert.equal(list.getValue(list.lastNode()), v1)

		list.addFirst(v2)
		list.addLast(v3)
		assert.equal(list.getValue(list.firstNode()), v2)
		assert.equal(list.getValue(list.lastNode()), v3)
	})


	QUnit.test('prevNode()/nextNode()', function (assert) {
		var v1 = {}
		var v2 = {}

		var list = new LinkedList
		var node1 = list.addLast(v1).lastNode()
		assert.equal(list.prevNode(node1), null)
		assert.equal(list.nextNode(node1), null)

		var node2 = list.addLast(v2).lastNode()
		assert.equal(list.prevNode(node1), null)
		assert.equal(list.getValue(list.nextNode(node1)), v2)
		assert.equal(list.getValue(list.prevNode(node2)), v1)
		assert.equal(list.nextNode(node2), null)
	})


	QUnit.test('setValue()/getValue()', function (assert) {
		var list = new LinkedList
		var node = list.addLast('abc').lastNode()
		assert.equal(list.getValue(node), 'abc')

		list.setValue(node, 123)
		assert.equal(list.getValue(node), 123)
	})


	//QUnit.test('insertBefore()/insertAfter()', function (assert) {
	//
	//})
})