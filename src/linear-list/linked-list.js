define(function (require) {
	var Linked = require('../linked/linked')
	var List = require('./base/list')


	var LinkedList = function () {
		this._linked = new Linked
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
		return this._linked.each(function (node) {
			if (operation(node.value())) {
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


	LinkedList.prototype.set = function (index, value) {
		this._findAt(index).setValue(value)
		return this
	}

	LinkedList.prototype.addFirst = function (value) {
		this._linked.addFirst(value)
		return this
	}

	LinkedList.prototype.addLast = function (value) {
		this._linked.addLast(value)
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


	LinkedList.prototype._findAt = function (index) {
		var current = this._linked.head()
		for (var i = 0; i < index; i++) {
			current = current.next()
		}
		return current
	}

	return LinkedList
})