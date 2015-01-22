define(function () {

	var LinkedList = function () {
		this._head = null
		this._tail = null
		this._count = 0
	}

	LinkedList.prototype.head = function () {
		return this._head
	}

	LinkedList.prototype.tail = function () {
		return this._tail
	}

	LinkedList.prototype.count = function () {
		return this._count
	}

	LinkedList.prototype.each = function (operation) {
		if (!this.head()) {
			return false
		}

		var current = this.head()
		while (current) {
			if (operation(current)) {
				return true
			}
			current = current.next()
		}

		return false
	}

	LinkedList.prototype.insertAfter = function (current, insert) {
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

	LinkedList.prototype.insertBefore = function (current, insert) {
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

	LinkedList.prototype.addLast = function (node) {
		if (this.tail()) {
			this.insertAfter(this.tail(), node)
		} else {
			this._head = this._tail = node
			this._count++
		}
		return node
	}

	LinkedList.prototype.addFirst = function (node) {
		if (this.head()) {
			this.insertBefore(this.head(), node)
		} else {
			this._head = this._tail = node
			this._count++
		}
		return node
	}

	LinkedList.prototype.remove = function (node) {
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