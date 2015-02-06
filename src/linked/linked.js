define(function (require) {
	var LinkedNode = require('./linked-node')

	/** Linked structure aiming at process linked node */
	var Linked = function () {
		this._head = null
		this._tail = null
		this._count = 0
	}

	Linked.prototype.head = function () {
		return this._head
	}

	Linked.prototype.tail = function () {
		return this._tail
	}

	Linked.prototype.count = function () {
		return this._count
	}

	Linked.prototype.each = function (operation) {
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

	Linked.prototype.insertAfter = function (node, value) {
		var next = node.next()
		var insertNode = new LinkedNode().setValue(value)
		node._next = insertNode
		insertNode._prev = node
		insertNode._next = next
		if (next) {
			next._prev = insertNode
		}
		if (node == this._tail) {
			this._tail = insertNode
		}
		this._count++
		return insertNode
	}

	Linked.prototype.insertBefore = function (node, value) {
		var prev = node.prev()
		var insertNode = new LinkedNode().setValue(value)
		insertNode._prev = prev
		insertNode._next = node
		node._prev = insertNode
		if (prev) {
			prev._next = insertNode
		}
		if (node == this._head) {
			this._head = insertNode
		}
		this._count++
		return insertNode
	}

	Linked.prototype.addLast = function (value) {
		if (this.tail()) {
			return this.insertAfter(this.tail(), value)
		} else {
			var node = new LinkedNode().setValue(value)
			this._head = this._tail = node
			this._count++
			return node
		}
	}


	Linked.prototype.addFirst = function (value) {
		if (this.head()) {
			return this.insertBefore(this.head(), value)
		} else {
			var node = new LinkedNode().setValue(value)
			this._head = this._tail = node
			this._count++
			return node
		}
	}


	Linked.prototype.remove = function (node) {
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

	return Linked
})