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
			if (operation(node._value, i)) {
				return true
			}
		})
	}

	LinkedList.prototype.count = function () {
		return this._linked.count()
	}

	LinkedList.prototype.isEmpty = function () {
		return this.count() == 0
	}


	LinkedList.prototype.first = function () {
		var head = this._linked.head()
		return head ? head._value : null
	}

	LinkedList.prototype.last = function () {
		var tail = this._linked.tail()
		return tail ? tail._value : null
	}

	LinkedList.prototype.getAt = function (index) {
		return this._findAt(index)._value
	}

	LinkedList.prototype.setAt = function (index, value) {
		this._findAt(index)._value = value
		return this
	}

	LinkedList.prototype.addFirst = function (value) {
		var node = this._linked.addFirst()
		node._value = value
		return this
	}

	LinkedList.prototype.addLast = function (value) {
		var node = this._linked.addLast()
		node._value = value
		return this
	}

	LinkedList.prototype.insertAt = function (index, value) {
		var node
		if (this.count() == 0) {
			node = this._linked.addLast()
		} else if (index > 0) {
			node = this._linked.insertAfter(this._findAt(index - 1))
		} else {
			node = this._linked.addFirst()
		}
		node._value = value
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


	LinkedList.prototype.firstNode = function () {
		return this._linked.head()
	}

	LinkedList.prototype.lastNode = function () {
		return this._linked.tail()
	}

	/** If it is not the last value, return next value, or return null */
	LinkedList.prototype.nextNode = function (node) {
		return node.next()
	}


	/** If it is not the first value, return prev value, or return null */
	LinkedList.prototype.prevNode = function (node) {
		return node.prev()
	}


	LinkedList.prototype.setValue = function (node, value) {
		node._value = value
		return this
	}

	LinkedList.prototype.getValue = function (node) {
		return node ? node._value : null
	}

	LinkedList.prototype.insertAfter = function (node, value) {
		var insert = this._linked.insertAfter(node)
		insert._value = value
		return this
	}

	LinkedList.prototype.insertBefore = function (node, value) {
		var insert = this._linked.insertBefore(node)
		insert._value = value
		return this
	}


	LinkedList.prototype._findAt = function (index) {
		var current = this._linked.head()
		for (var i = 0; i < index; i++) {
			current = current.next()
		}
		return current
	}

	return LinkedList
})