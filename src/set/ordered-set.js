define(function (require) {
	var SetBase = require('./base/set-base')


	var OrderedSet = function (compare) {
		this._compare = compare
		this._elements = []
	}

	/** Create a set by a array of elements */
	OrderedSet.fromArray = function (elements, compare) {
		var s = new OrderedSet(compare)
		for (var i in elements) {
			s.add(elements[i])
		}
		return s
	}

	OrderedSet.prototype = new SetBase

	OrderedSet.prototype.index = function (element) {
		for (var i = 0; i < this._elements.length; i++) {
			if (this._compare(element, this._elements[i]) == 0) {
				return i
			}
		}
		return -1
	}

	OrderedSet.prototype.has = function (element) {
		return this.index(element) >= 0
	}

	OrderedSet.prototype.add = function (element) {
		for (var i = 0; i < this._elements.length; i++) {
			if (this._compare(element, this._elements[i]) <= 0) {
				break
			}
		}

		if (i < this._elements.length && this._compare(element, this._elements[i]) == 0) {
			return false
		}
		this._elements.splice(i, 0, element)
		return true
	}

	OrderedSet.prototype.removeAt = function (i) {
		this._elements.splice(i, 1)
	}


	return OrderedSet
})