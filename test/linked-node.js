define(function (require) {
	var LinkedNode = require('src/linked-node')

	QUnit.module('LinkedNode')

	function checkChildren(assert, node, children) {
		if (children.length == 0) {
			assert.equal(node.firstChild(), null)
			assert.equal(node.lastChild(), null)
		}

		var count = 0
		node.eachChild(function (child, i) {
			assert.equal(child, children[i])
			count++
			if (i > 0) {
				assert.equal(child.leftBrother(), children[i - 1], 'leftBrother():i=' + i)
			}
			if (i < children.length - 1) {
				assert.equal(child.rightBrother(), children[i + 1], 'rightBrother():i=' + i)
			}
		})
		assert.equal(count, children.length)
	}
	

	QUnit.test('leftBrother()/rightBrother()', function (assert) {
		var root = new LinkedNode
		var n1 = new LinkedNode
		var n2 = new LinkedNode

		checkChildren(assert, root, [])
		assert.ok(true, 's1')

		root.addChildLast(n1)
		checkChildren(assert, root, [n1])
		assert.ok(true, 's2')

		root.addChildLast(n2)
		checkChildren(assert, root, [n1, n2])
	})

})