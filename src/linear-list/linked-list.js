define(function (require) {
	var Node = require('./linked-list-node')
	var List = require('./base/list')

	var LinkedList = function () {
		this._head = null
		this._tail = null
		this._count = 0
	}

	LinkedList.prototype = new List

	LinkedList.fromArray = function (values) {
		var list = new LinkedList
		_.each(values, function (value) {
			list.addLast(value)
		})
		return list
	}

	LinkedList.prototype.toArray = function () {
		var values = []
		this.each(function (value) {
			values.push(value)
		})
		return values
	}

	LinkedList.prototype.each = function (operation) {
		if (!this._head) {
			return false
		}

		var current = this._head
		while (current) {
			if (operation(current.value)) {
				return true
			}
			current = current.next()
		}

		return false
	}

	LinkedList.prototype.first = function () {
		if (this.isEmpty()) {
			throw  'LinkedList should not be empty'
		}
		return this._head.value
	}

	LinkedList.prototype.last = function () {
		if (this.isEmpty()) {
			throw 'LinkedList should not be empty'
		}
		return this._tail.value
	}

	LinkedList.prototype.count = function () {
		return this._count
	}

	LinkedList.prototype.isEmpty = function () {
		return this._count == 0
	}

	LinkedList.prototype.get = function (index) {
		return this._findAt(index).value
	}


	LinkedList.prototype.set = function (index, value) {
		this._findAt(index).value = value
		return this
	}

	LinkedList.prototype.addFirst = function (value) {
		var node = new Node
		node.value = value
		this._addFirst(node)
		return this
	}

	LinkedList.prototype.addLast = function (value) {
		var node = new Node
		node.value = value
		this._addLast(node)
		return this
	}

	LinkedList.prototype.insertAt = function (index, value) {
		// create node
		var node = new Node
		node.value = value

		// insert
		if (this.count() == 0) {
			this.addLast(value)
		} else if (index > 0) {
			this._insertAfter(this._findAt(index - 1), node)
		} else {
			this._addFirst(node)
		}
	}

	LinkedList.prototype.removeAt = function (index) {
		var node = this._findAt(index)
		this._remove(node)
		return this
	}


	LinkedList.prototype.clear = function () {
		this._head = null
		this._tail = null
		this._count = 0
		return this
	}


	LinkedList.prototype._findAt = function (index) {
		var current = this._head
		for (var i = 0; i < index; i++) {
			current = current.next()
		}
		return current
	}

	LinkedList.prototype._insertAfter = function (current, insert) {
		var next = current.next()
		current._next = insert
		insert._prev = current
		insert._next = next
		if (next) {
			next._prev = insert
		}
		if (current == this._tail) {
			this._tail = insert
		}
		this._count++
		return insert
	}

	LinkedList.prototype._insertBefore = function (current, insert) {
		var prev = current.prev()
		insert._prev = prev
		insert._next = current
		current._prev = insert
		if (prev) {
			prev._next = insert
		}
		if (current == this._head) {
			this._head = insert
		}
		this._count++
		return insert
	}

	LinkedList.prototype._addLast = function (node) {
		if (this._tail) {
			this._insertAfter(this._tail, node)
		} else {
			this._head = this._tail = node
			this._count++
		}
		return node
	}

	LinkedList.prototype._addFirst = function (node) {
		if (this._head) {
			this._insertBefore(this._head, node)
		} else {
			this._head = this._tail = node
			this._count++
		}
		return node
	}

	LinkedList.prototype._remove = function (node) {
		var prev = node.prev()
		var next = node.next()
		node._prev = node._next = null
		if (prev) {
			prev._next = next
		} else {
			this._head = next
		}
		if (next) {
			next._prev = prev
		} else {
			this._tail = prev
		}
		this._count--
		return node
	}

	return LinkedList
})