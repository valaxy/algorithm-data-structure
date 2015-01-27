define(function (require) {
	var ArrayNode = require('src/tree/array-node')
	var LinkedNode = require('src/tree/linked-node')
	var Nodes = [ArrayNode, LinkedNode]

	QUnit.module('Node')

	function checkChildren(assert, node, children) {
		if (children.length > 0) {
			assert.equal(node.firstChild(), children[0])
		}
		var last = null
		node.eachChild(function (child, index) {
			assert.equal(child, children[index])
			last = child
		})
		assert.equal(node.maxChildrenCount(), children.length)
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

	QUnit.test('eachChild(): no break', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]
			var root = new Node
			var n1 = new Node
			var n2 = new Node
			var n3 = new Node
			root.addChildLast(n1, n2, n3)

			var children = [n1, n2, n3]
			var count = 0
			var isBreak = root.eachChild(function (child, index) {
				assert.equal(child, children[index])
				count++
			})
			assert.equal(count, 3)
			assert.ok(!isBreak)
		}
	})

	QUnit.test('eachChild(): has break', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]
			var root = new Node
			root.addChildLast(new Node, new Node, new Node)

			var end = 0
			var isBreak = root.eachChild(function (child, index) {
				end = index
				if (index == 1) {
					return true
				}
			})
			assert.equal(end, 1)
			assert.ok(isBreak)
		}
	})

	QUnit.test('addChildLast()/parent()/firstChild()/lastChild()/childrenCount()', function (assert) {
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

	QUnit.test('leftestDescendant', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]

			var root = new Node
			var n1 = new Node
			var n2 = new Node
			var n3 = new Node
			assert.equal(root.leftestDescendant(), root)

			root.addChildLast(n1)
			assert.equal(root.leftestDescendant(), n1)

			root.addChildLast(n2)
			assert.equal(root.leftestDescendant(), n1)

			n1.addChildLast(n3)
			assert.equal(root.leftestDescendant(), n3)
		}
	})


	QUnit.test('isSameStructure(): right case', function (assert) {
		var root = []
		for (var i in Nodes) {
			var Node = Nodes[i]

			root[i] = new Node
			var n0 = new Node
			var n1 = new Node
			var n2 = new Node
			root[i].addChildLast(n0)
			root[i].addChildLast(n1)
			n1.addChildLast(n2)

			assert.ok(root[i].isSameStructure(root[i]))
			assert.ok(!root[i].isSameStructure(n2))
		}

		root[0].isSameStructure(root[1])
	})


	QUnit.test('isSameStructure(): wrong case', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]

			// tree1
			var root1 = new Node
			var n1 = new Node
			root1.addChildLast(new Node, n1)
			n1.addChildLast(new Node)

			// tree2
			var root2 = new Node
			root2.addChildLast(new Node, new Node)

			assert.ok(!root1.isSameStructure(root2))
			assert.ok(!root2.isSameStructure(root1))
		}
	})


	QUnit.test('toString()', function (assert) {
		for (var i in Nodes) {
			var Node = Nodes[i]
			var root = new Node
			var n0 = new Node
			var n1 = new Node
			var n2 = new Node
			var n3 = new Node
			root.addChildLast(n0, n1, n3)
			n1.addChildLast(n2)

			var str =
				'node\n' +
				'    node\n' +
				'    node\n' +
				'        node\n' +
				'    node\n'
			assert.equal(root.toString(), str)
		}
	})
})