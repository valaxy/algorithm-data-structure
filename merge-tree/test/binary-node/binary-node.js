define(function (require) {
	var BinaryNode = require('src/binary-node')

	module('BinaryNode')

	test('left()/right()', function (assert) {
		var node = new BinaryNode
		var left = new BinaryNode
		var right = new BinaryNode
		assert.equal(node.left(), null)
		assert.equal(node.right(), null)

		node.setChild(0, left)
		node.setChild(1, right)
		assert.equal(node.left(), left)
		assert.equal(node.right(), right)
	})

	test('setLeft()/setRight()', function (assert) {
		var node = new BinaryNode
		var left = new BinaryNode
		var right = new BinaryNode
		node.setLeft(left)
		node.setRight(right)
		assert.equal(node.child(0), left)
		assert.equal(node.child(1), right)
		assert.equal(left.parent(), node)
		assert.equal(right.parent(), node)

		// override
		var newLeft = new BinaryNode
		var newRight = new BinaryNode
		node.setLeft(newLeft)
		node.setRight(newRight)
		assert.equal(left.parent(), null)
		assert.equal(right.parent(), null)
	})


})