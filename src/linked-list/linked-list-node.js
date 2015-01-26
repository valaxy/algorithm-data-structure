(function (factory) {
	if (typeof exports === 'object') {
		var result = factory(require, exports, module)
		if (result) {
			module.exports = result
		}
	} else {
		define(factory)
	}
})(function () {

	var LinkedListNode = function () {
		this._prev = null
		this._next = null
	}

	LinkedListNode.prototype.next = function () {
		return this._next
	}

	LinkedListNode.prototype.prev = function () {
		return this._prev
	}

	LinkedListNode.prototype.addNext = function (insert) {
		var next = this.next()
		this._next = insert
		insert._prev = this
		if (next) {
			insert._next = next
			next._prev = insert
		}
	}

	LinkedListNode.prototype.addPrev = function (insert) {
		var prev = this.prev()
		insert._next = this
		this._prev = insert
		if (prev) {
			insert._prev = prev
			prev._next = insert
		}
	}

	LinkedListNode.prototype.remove = function () {
		var prev = this.prev()
		var next = this.next()
		this._prev = this._next = null
		if (prev) {
			prev._next = next
		}
		if (next) {
			next._prev = prev
		}
	}

	return LinkedListNode
})