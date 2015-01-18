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
	}

	return LinkedNode
})