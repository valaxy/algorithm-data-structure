define(function (require) {
	var _ = require('underscore')
	var List = require('./base/list')

	/** Array-like list */
	var ArrayList = function () {
		this._values = []
	}

	ArrayList.prototype = new List

	ArrayList.fromArray = function (values) {
		var l = new ArrayList
		l._values = [].concat(values)
		return l
	}

	ArrayList.prototype.toArray = function () {
		return [].concat(this._values)
	}

	ArrayList.prototype.each = function (operation) {
		for (var i in this._values) {
			if (operation(this._values[i])) {
				return true
			}
		}
		return false
	}

	ArrayList.prototype.first = function () {
		if (this.isEmpty()) {
			throw "List should not be empty."
		}
		return _.first(this._values)
	}

	ArrayList.prototype.last = function () {
		if (this.isEmpty()) {
			throw "List should not be empty."
		}
		return _.last(this._values)
	}

	ArrayList.prototype.count = function () {
		return this._values.length
	}

	ArrayList.prototype.isEmpty = function () {
		return this.count() == 0
	}


	ArrayList.prototype.get = function (index) {
		return this._values[index]
	}

	ArrayList.prototype.set = function (index, value) {
		this._values[index] = value
		return this
	}

	ArrayList.prototype.addFirst = function (value) {
		this._values.splice(0, 0, value)
		return this
	}

	ArrayList.prototype.addLast = function (value) {
		this._values.push(value)
		return this
	}

	ArrayList.prototype.insertAt = function (index, value) {
		this._values.splice(index, 0, value)
		return this
	}

	ArrayList.prototype.removeAt = function (index) {
		this._values.splice(index, 1)
		return this
	}

	ArrayList.prototype.clear = function () {
		this._values = []
		return this
	}


	return ArrayList
})