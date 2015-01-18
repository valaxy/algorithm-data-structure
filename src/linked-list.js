define(function () {

	var LinkedList = function () {
		this._head = null
		this._tail = null
	}

	LinkedList.prototype.head = function () {
		return this._head
	}

	LinkedList.prototype.tail = function () {
		return this._tail
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
		return insert
	}

	LinkedList.prototype.addLast = function (node) {
		if (this.tail()) {
			this.insertAfter(this.tail(), node)
		} else {
			this._head = this._tail = node
		}
		return node
	}

	LinkedList.prototype.addFirst = function (node) {
		if (this.head()) {
			this.insertBefore(this.head(), node)
		} else {
			this._head = this._tail = node
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
		return node
	}

	return LinkedList

})