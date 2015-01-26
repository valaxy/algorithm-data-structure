define(function (require, exports) {
	var FixNode = require('src/fix-node')

	module('FixNode')

	test('parent()', function (assert) {
		var node = new FixNode(2)
		var node1 = new FixNode(2)
		assert.equal(node.parent(), null)

		node.setChild(0, node1)
		assert.equal(node1.parent(), node)
	})


	test('child()', function (assert) {
		var n1 = new FixNode(2)
		var n2 = new FixNode(2)
		assert.equal(n1.child(0), null)
		assert.equal(n2.child(0), null)

		n1.setChild(1, n2)
		assert.equal(n1.child(0), null)
		assert.equal(n1.child(1), n2)
	})


	test('childrenCount()', function (assert) {
		var root = new FixNode(10)
		assert.equal(root.childrenCount(), 10)

		root.setChild(3, new FixNode)
		assert.equal(root.childrenCount(), 10)
	})


	test('eachChild()/setChild()', function (assert) {
		var root = new FixNode(3)
		var n1 = new FixNode(1)
		var n2 = new FixNode(1)
		root.setChild(0, n1)
		root.setChild(2, n2)

		var nodes = [n1, null, n2]

		// test no break
		var i = 0
		assert.ok(!root.eachChild(function (child) {
			assert.equal(child, nodes[i++])
		}))
		assert.equal(i, 3)

		// test break
		i = 0
		assert.ok(root.eachChild(function () {
			if (i == 1) {
				return true
			}
			i++
		}))
		assert.equal(i, 1)
	})

})