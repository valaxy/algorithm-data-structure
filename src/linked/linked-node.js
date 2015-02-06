define(function () {

	var LinkedNode = function () {
		this._prev = null
		this._next = null
		this._value = null
	}

	LinkedNode.prototype.next = function () {
		return this._next
	}

	LinkedNode.prototype.prev = function () {
		return this._prev
	}

	LinkedNode.prototype.value = function () {
		return this._value
	}

	LinkedNode.prototype.setValue = function (value) {
		this._value = value
		return this
	}

	LinkedNode.prototype.addNext = function (node) {
		var next = this.next()
		this._next = node
		node._prev = this
		if (next) {
			node._next = next
			next._prev = node
		}
	}

	LinkedNode.prototype.addPrev = function (node) {
		var prev = this.prev()
		node._next = this
		this._prev = node
		if (prev) {
			node._prev = prev
			prev._next = node
		}
	}

	LinkedNode.prototype.remove = function () {
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

	return LinkedNode
})