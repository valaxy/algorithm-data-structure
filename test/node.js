define(function (require) {
	var ArrayNode = require('src/array-node')
	var LinkedNode = require('src/linked-node')
	var Nodes = [ArrayNode, LinkedNode]

	QUnit.module('Node')

	function checkChildren(assert, node, children) {
		var count = 0
		if (children.length > 0) {
			assert.equal(node.firstChild(), children[0])
		}
		var last = null
		node.eachChild(function (child, index) {
			assert.equal(child, children[index])
			count++
			last = child
		})
		assert.equal(count, children.length)
		if (children.length > 0) {
			assert.equal(last, children[children.length - 1])
		}
	}

	QUnit.test('constructor', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]
			var node = new Node

			assert.equal(node.parent(), null)
		}
	})

	QUnit.test('addChildLast()/parent()/eachChild()/firstChild()/lastChild()', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]

			var root = new Node
			var n1 = new Node
			var n2 = new Node
			var n3 = new Node
			root.addChildLast(n1, n2)
			n2.addChildLast(n3)

			assert.equal(root.parent(), null)
			assert.equal(n1.parent(), root)
			assert.equal(n2.parent(), root)
			assert.equal(n3.parent(), n2)

			checkChildren(assert, root, [n1, n2])
		}
	})

	QUnit.test('appendRightBrother()', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]
			var root = new Node
			var n0 = new Node
			var n1 = new Node
			var n2 = new Node
			root.addChildLast(n0)
			root.addChildLast(n2)
			n0.appendRightBrother(n1)

			checkChildren(assert, root, [n0, n1, n2])
			assert.equal(n1.parent(), root)
		}
	})


})