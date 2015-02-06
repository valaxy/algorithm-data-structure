define(function (require) {
	var ArrayList = require('src/linear-list/array-list')
	var LinkedList = require('src/linear-list/linked-list')
	var Lists = [ArrayList, LinkedList]

	module('ArrayList/LinkedList')


	test('toArray()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			assert.deepEqual(list.toArray(), [])

			list.addLast(0)
			list.addLast(null)
			list.addLast(false)
			list.addLast(undefined)
			assert.deepEqual(list.toArray(), [0, null, false, undefined])
		}
	})

	test('first()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			try {
				list.first()
				assert.ok(false)
			} catch (e) {
				assert.ok(true)
			}


			list.addLast(100).addLast(200).addLast(300)
			assert.equal(list.first(), 100)
		}
	})

	test('last()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			try {
				list.last()
				assert.ok(false)
			} catch (e) {
				assert.ok(true)
			}

			list.addLast(100).addLast(200).addLast(300)
			assert.equal(list.last(), 300)
		}
	})


	test('count()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			assert.equal(list.count(), 0)

			list.addLast(100)
			assert.equal(list.count(), 1)

			list.addLast(100)
			assert.equal(list.count(), 2)
		}
	})


	test('isEmpty()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			assert.ok(list.isEmpty())

			list.addLast(1)
			assert.ok(!list.isEmpty())
		}
	})


	test('each()', function (assert) {
		for (var i in Lists) {
			// empty list
			var list = new Lists[i]
			assert.ok(!list.each(function () {
				assert.ok(false)
			}))

			// no-break
			list.addLast(100)
			list.addLast(200)
			list.addLast(300)
			var values = []
			assert.ok(!list.each(function (value) {
				values.push(value)
			}))
			assert.deepEqual(values, [100, 200, 300])

			// break
			var count = 0
			assert.ok(list.each(function () {
				if (count == 1) {
					return true
				}
				count++
			}))
			assert.equal(count, 1)
		}
	})


	test('get()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			list.addLast(100).addLast(200).addLast(300)
			assert.equal(list.get(0), 100)
			assert.equal(list.get(1), 200)
			assert.equal(list.get(2), 300)
		}
	})


	test('set()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			list.addLast(100).addLast(200).addLast(300)
			assert.equal(list.set(0, 1), list)
			list.set(1, 2)
			list.set(2, 3)
			assert.equal(list.get(0), 1)
			assert.equal(list.get(1), 2)
			assert.equal(list.get(2), 3)
		}
	})

	test('addFirst()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			assert.equal(list.addFirst(1), list)
			assert.deepEqual(list.toArray(), [1])

			list.addFirst(2)
			assert.deepEqual(list.toArray(), [2, 1])
			assert.equal(list.count(), 2)
		}
	})


	test('addLast()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			assert.equal(list.addLast(1), list)
			assert.deepEqual(list.toArray(), [1])

			list.addLast(2)
			assert.deepEqual(list.toArray(), [1, 2])
			assert.equal(list.count(), 2)
		}
	})


	test('insertAt()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]

			// insert into empty at 1st position
			list.insertAt(0, 1)
			assert.deepEqual(list.toArray(), [1])

			// insert at first
			list.insertAt(0, 2)
			assert.deepEqual(list.toArray(), [2, 1])

			// insert at last
			list.insertAt(2, 3)
			assert.deepEqual(list.toArray(), [2, 1, 3])

			// insert at middle
			list.insertAt(1, 4)
			assert.deepEqual(list.toArray(), [2, 4, 1, 3])
		}
	})


	test('removeAt', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			list.addLast(100).addLast(200).addLast(300)

			assert.equal(list.removeAt(1), list)
			assert.deepEqual(list.toArray(), [100, 300])

			list.removeAt(1)
			list.removeAt(0)
			assert.deepEqual(list.toArray(), [])
			assert.equal(list.count(), 0)
		}
	})

	test('clear()', function (assert) {
		for (var i in Lists) {
			var list = new Lists[i]
			list.addLast(1).addLast(2).addLast(3)
			assert.equal(list.clear(), list)
			assert.deepEqual(list.toArray(), [])
		}
	})


})