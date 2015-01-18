define(function (require, exports) {

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
	}

	LinkedList.prototype.insertBefore = function (current, insert) {
		var prev = current.prev()
		insert._prev = prev
		insert._next = current
		current._prev = insert
		if (prev) {
			prev._next = insert
		}
	}

	LinkedList.prototype.addLast = function (node) {
		if (this._head) {
			this.insertAfter(node)
		} else {
			this._head = node
		}
	}


	if (typeof QUnit != 'undefined') {
		QUnit.module('linked-list')

		QUnit.test(function () {

		})
	}

})