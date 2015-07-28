define(function () {

	var LinkedNode = function () {
		this._prev = null
		this._next = null
	}

	/** Get next node or null */
	LinkedNode.prototype.next = function () {
		return this._next
	}

	/** Get prev node or null */
	LinkedNode.prototype.prev = function () {
		return this._prev
	}

	/** Make `node` to be the next node */
	LinkedNode.prototype.addNext = function (node) {
		var next = this.next()
		this._next = node
		node._prev = this
		if (next) {
			node._next = next
			next._prev = node
		}
	}

	/** Make `node` to be the prev node */
	LinkedNode.prototype.addPrev = function (node) {
		var prev = this.prev()
		node._next = this
		this._prev = node
		if (prev) {
			node._prev = prev
			prev._next = node
		}
	}

	/** Cut the relation with prev and next if relations exist */
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