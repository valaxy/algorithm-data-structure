define(function (require) {
	var Linked = require('../linked/linked')
	var List = require('./base/list')


	var compare = function (x, y) {
		return x === y
	}

	var getLinkedNode = function (value) {
		return value._linkedNode
	}

	var setLinkedNode = function (value, node) {
		value._linkedNode = node
	}


	/** Linked List can only process object value */
	var LinkedList = function (options) {
		options = options || {}
		this._linked = new Linked
		this._compare = options.compare || compare
		this._getLinkedNode = options.getLinkedNode || getLinkedNode
		this._setLinkedNode = options.setLinkedNode || setLinkedNode
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
		return this._linked.each(function (node, i) {
			if (operation(node.value(), i)) {
				return true
			}
		})
	}

	LinkedList.prototype.first = function () {
		return this._linked.head().value()
	}

	LinkedList.prototype.last = function () {
		return this._linked.tail().value()
	}

	LinkedList.prototype.count = function () {
		return this._linked.count()
	}

	LinkedList.prototype.isEmpty = function () {
		return this.count() == 0
	}

	LinkedList.prototype.get = function (index) {
		return this._findAt(index).value()
	}

	/** If it is not the last value, return next value, or return null */
	LinkedList.prototype.next = function (value) {
		var node = this._getLinkedNode(value)
		return node.next() ? node.next().value() : null
	}


	/** If it is not the first value, return prev value, or return null */
	LinkedList.prototype.prev = function (value) {
		var node = this._getLinkedNode(value)
		return node.prev() ? node.prev().value() : null
	}


	LinkedList.prototype.set = function (index, value) {
		this._findAt(index).setValue(value)
		return this
	}

	LinkedList.prototype.addFirst = function (value) {
		var node = this._linked.addFirst(value)
		this._setLinkedNode(value, node)
		return this
	}

	LinkedList.prototype.addLast = function (value) {
		var node = this._linked.addLast(value)
		this._setLinkedNode(value, node)
		return this
	}

	LinkedList.prototype.insertAt = function (index, value) {
		if (this.count() == 0) {
			this._linked.addLast(value)
		} else if (index > 0) {
			this._linked.insertAfter(this._findAt(index - 1), value)
		} else {
			this._linked.addFirst(value)
		}
	}

	LinkedList.prototype.removeAt = function (index) {
		var node = this._findAt(index)
		this._linked.remove(node)
		return this
	}


	LinkedList.prototype.clear = function () {
		this._linked = new Linked
		return this
	}


	/**  */
	LinkedList.prototype._findAt = function (index) {
		var current = this._linked.head()
		for (var i = 0; i < index; i++) {
			current = current.next()
		}
		return current
	}

	return LinkedList
})