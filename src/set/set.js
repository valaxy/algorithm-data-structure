var SetBase = require('./base/set-base')

var defaultCompare = function (x, y) {
	return x === y
}

/** The math structure of Set */
var Set = function (compare) {
	this._elements = []
	this._compare = compare || defaultCompare
}

Set.prototype = new SetBase

/** Create a set by a array of elements */
Set.fromArray = function (elements, compare) {
	var s = new Set(compare)
	for (var i in elements) {
		s.add(elements[i])
	}
	return s
}


/** Check if `element` is exist */
Set.prototype.has = function (element) {
	for (var i in this._elements) {
		if (this._compare(element, this._elements[i])) {
			return true
		}
	}
	return false
}


/** Add element */
Set.prototype.add = function (element) {
	for (var i in this._elements) {
		if (this._compare(this._elements[i], element)) {
			return false
		}
	}
	this._elements.push(element)
	return true
}


/** Remove the element from the set, return true if exist otherwise return false */
Set.prototype.remove = function (element) {
	for (var i in this._elements) {
		if (this._compare(element, this._elements[i])) {
			this._elements.splice(i, 1)
			return true
		}
	}
	return false
}


module.exports = Set
