define(function (require) {

	var LinkedList = require('src/linked-list')
	var LinkedListNode = require('src/linked-list-node')

	QUnit.module('linked-list')

	function checkLinks(assert, list, nodes) {
		assert.equal(list.count(), nodes.length)
		if (nodes.length == 0) {
			assert.equal(list.head(), null)
			assert.equal(list.tail(), null)
		} else {
			assert.equal(list.head(), nodes[0])
			assert.equal(list.tail(), nodes[nodes.length - 1])
			for (var i = 1; i < nodes.length - 1; i++) {
				assert.equal(nodes[i].prev(), nodes[i - 1])
				assert.equal(nodes[i].next(), nodes[i + 1])
			}
			assert.equal(nodes[0].prev(), null)
			assert.equal(nodes[nodes.length - 1].next(), null)
		}
	}


	QUnit.test('constructor', function (assert) {
		var list = new LinkedList
		assert.equal(list.head(), null)
		assert.equal(list.head(), list.tail())
	})


	QUnit.test('insertAfter()', function (assert) {
		var list = new LinkedList
		var n1 = list.addLast(new LinkedListNode)
		var n2 = list.insertAfter(n1, new LinkedListNode)
		checkLinks(assert, list, [n1, n2])

		var n3 = list.insertAfter(n1, new LinkedListNode)
		checkLinks(assert, list, [n1, n3, n2])
	})


	QUnit.test('insertBefore()', function (assert) {
		var list = new LinkedList
		var n1 = list.addLast(new LinkedListNode)
		var n2 = list.insertBefore(n1, new LinkedListNode)
		checkLinks(assert, list, [n2, n1])

		var n3 = list.insertBefore(n1, new LinkedListNode)
		checkLinks(assert, list, [n2, n3, n1])
	})


	QUnit.test('addLast()', function (assert) {
		var list = new LinkedList
		var n1 = list.addLast(new LinkedListNode)
		checkLinks(assert, list, [n1])

		var n2 = list.addLast(new LinkedListNode)
		checkLinks(assert, list, [n1, n2])
	})

	QUnit.test('addFirst()', function (assert) {
		var list = new LinkedList
		var n1 = list.addFirst(new LinkedListNode)
		checkLinks(assert, list, [n1])

		var n2 = list.addFirst(new LinkedListNode)
		checkLinks(assert, list, [n2, n1])
	})


	QUnit.test('remove()', function (assert) {
		var list = new LinkedList
		var n1 = list.addLast(new LinkedListNode)
		var n2 = list.addLast(new LinkedListNode)
		var n3 = list.addLast(new LinkedListNode)
		var n4 = list.addLast(new LinkedListNode)
		var n5 = list.addLast(new LinkedListNode)
		checkLinks(assert, list, [n1, n2, n3, n4, n5])

		list.remove(n1)
		checkLinks(assert, list, [n2, n3, n4, n5])

		list.remove(n3)
		checkLinks(assert, list, [n2, n4, n5])

		list.remove(n5)
		checkLinks(assert, list, [n2, n4])

		list.remove(n2)
		list.remove(n4)
		checkLinks(assert, list, [])
	})

	QUnit.test('each()', function (assert) {
		// empty list
		var list = new LinkedList
		assert.ok(!list.each(function () {
			assert.ok(false)
		}))

		// no-break
		list.addLast(new LinkedListNode)
		list.addLast(new LinkedListNode)
		list.addLast(new LinkedListNode)
		var count = 0
		assert.ok(!list.each(function () {
			count++
		}))
		assert.equal(count, 3)

		// break
		var count = 0
		assert.ok(list.each(function () {
			if (count == 1) {
				return true
			}
			count++
		}))
		assert.equal(count, 1)
	})

})