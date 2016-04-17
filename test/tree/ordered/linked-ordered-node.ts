define(function (require) {
	var TreeNode = require('cjs!lib/tree/ordered/linked-ordered-node')

	QUnit.module('LinkedOrderedNode')

	function checkChildren(assert, node, children) {
		if (children.length == 0) {
			assert.equal(node.leftmostChild(), null)
			assert.equal(node.rightmostChild(), null)
		}

		var count = 0
		node.eachChild(function (child, i) {
			assert.equal(child, children[i])
			count++
			if (i > 0) {
				assert.equal(child.leftSibling(), children[i - 1], 'leftSibling():i=' + i)
			}
			if (i < children.length - 1) {
				assert.equal(child.rightSibling(), children[i + 1], 'rightSibling():i=' + i)
			}
		})
		assert.equal(count, children.length)
	}


	QUnit.test('leftSibling()', function (assert) {
		var root = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		var n3 = new TreeNode

		root.addChildLast(n1)
		assert.equal(n1.leftSibling(), null)

		root.addChildLast(n2)
		assert.equal(n1.leftSibling(), null)
		assert.equal(n2.leftSibling(), n1)

		root.addChildLast(n3)
		assert.equal(n2.leftSibling(), n1)
		assert.equal(n3.leftSibling(), n2)
	})


	QUnit.test('rightSibling()', function (assert) {
		var root = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		var n3 = new TreeNode

		root.addChildFirst(n1)
		assert.equal(n1.rightSibling(), null)

		root.addChildFirst(n2)
		assert.equal(n1.rightSibling(), null)
		assert.equal(n2.rightSibling(), n1)

		root.addChildFirst(n3)
		assert.equal(n2.rightSibling(), n1)
		assert.equal(n3.rightSibling(), n2)
	})

	QUnit.test('appendLeftSibling()', function (assert) {
		var root = new TreeNode
		var n0 = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		root.addChildLast(n0)
		n0.appendLeftSibling(n1)
		n1.appendLeftSibling(n2)

		checkChildren(assert, root, [n2, n1, n0])
		assert.equal(n1.parent(), root)
	})

	QUnit.test('appendRightSibing()', function (assert) {
		var root = new TreeNode
		var n0 = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		root.addChildLast(n0)
		n0.appendRightSibing(n1)
		n1.appendRightSibing(n2)

		checkChildren(assert, root, [n0, n1, n2])
		assert.equal(n1.parent(), root)
	})

	QUnit.test('cut()', function (assert) {
		var root = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		var n3 = new TreeNode
		var n4 = new TreeNode
		root.addChildLast(n1).addChildLast(n2).addChildLast(n3)
		n3.addChildLast(n4)
		checkChildren(assert, root, [n1, n2, n3])

		assert.ok(true, 'ss')
		n2.cut()
		checkChildren(assert, root, [n1, n3])
	})

	QUnit.test('delete(): single node case', function (assert) {
		var root = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		var n3 = new TreeNode
		root.addChildLast(n1)
		n1.addChildLast(n2).addChildLast(n3)
		n1.delete()
		assert.equal(root.toString(),
			'node\n' +
			'    node\n' +
			'    node\n')
	})


	QUnit.test('delete(): not single node case', function (assert) {
		var root = new TreeNode
		var n1 = new TreeNode
		var n2 = new TreeNode
		var n3 = new TreeNode
		var n4 = new TreeNode
		var n5 = new TreeNode
		root.addChildLast(n1).addChildLast(n2).addChildLast(n3)
		n2.addChildLast(n4).addChildLast(n5)
		n2.delete()
		assert.equal(root.toString(),
			'node\n' +
			'    node\n' +
			'    node\n' +
			'    node\n' +
			'    node\n')

	})
})