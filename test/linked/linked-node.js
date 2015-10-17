define(function (require) {
	var LinkedNode = require('cjs!src/linked/linked-node')

	QUnit.module('LinkedNode')

	//test('value()/setValue()', function (assert) {
	//	var node = new LinkedNode
	//	assert.equal(node.setValue(123), node)
	//	assert.equal(node.value(), 123)
	//})

	QUnit.test('addNext()/prev()/next()', function (assert) {
		var node = new LinkedNode
		assert.equal(node.next(), null)
		assert.equal(node.prev(), null)

		var node2 = new LinkedNode
		node.addNext(node2)
		assert.equal(node.prev(), null)
		assert.equal(node.next(), node2)
		assert.equal(node2.prev(), node)
		assert.equal(node2.next(), null)

		var node3 = new LinkedNode
		node.addNext(node3)
		assert.equal(node.next(), node3)
		assert.equal(node3.prev(), node)
		assert.equal(node3.next(), node2)
		assert.equal(node2.prev(), node3)
	})

	QUnit.test('addPrev()', function (assert) {
		var node = new LinkedNode
		var node2 = new LinkedNode
		node.addPrev(node2)
		assert.equal(node.next(), null)
		assert.equal(node.prev(), node2)
		assert.equal(node2.next(), node)
		assert.equal(node2.prev(), null)

		var node3 = new LinkedNode
		node.addPrev(node3)
		assert.equal(node.prev(), node3)
		assert.equal(node3.next(), node)
		assert.equal(node3.prev(), node2)
		assert.equal(node2.next(), node3)
	})

	QUnit.test('remove()', function (assert) {
		// single node
		var node = new LinkedNode
		node.remove()
		assert.equal(node.prev(), null)
		assert.equal(node.next(), null)

		var n1 = new LinkedNode
		var n2 = new LinkedNode
		var n3 = new LinkedNode
		n1.addNext(n2)
		n2.addNext(n3)

		// middle node
		n2.remove()
		assert.equal(n1.next(), n3)
		assert.equal(n3.prev(), n1)
		assert.equal(n2.prev(), null)
		assert.equal(n2.next(), null)

		// left-head node
		n1.remove()
		assert.equal(n1.next(), null)
		assert.equal(n3.prev(), null)

		// right-head node
		n1.addNext(n2)
		n2.remove()
		assert.equal(n1.next(), null)
		assert.equal(n2.prev(), null)
	})

})