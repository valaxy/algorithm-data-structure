(function (factory) {
	if (typeof exports === 'object') {
		var result = factory(require, exports, module)
		if (result) {
			module.exports = result
		}
	} else {
		define(factory)
	}
})(function (require) {
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

	/** Check if has one of `elements` */
	Set.prototype.hasOneOf = function (elements) {
		for (var i in elements) {
			if (this.has(elements[i])) {
				return true
			}
		}
		return false
	}

	/** Check if has all `elements` */
	Set.prototype.hasAll = function (elements) {
		for (var i in elements) {
			if (!this.has(elements[i])) {
				return false
			}
		}
		return true
	}


	/** Iterate each element and invoke `operation` */
	Set.prototype.each = function (operation) {
		for (var i in this._elements) {
			if (operation(this._elements[i])) {
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

	/** Perform a union with `otherSet` and return this */
	Set.prototype.union = function (otherSet) {
		var me = this
		otherSet.each(function (x) {
			me.add(x)
		})
		return this
	}


	/** Perform an intersection with `otherSet` and return this */
	Set.prototype.intersect = function (otherSet) {
		var me = this
		var needRemove = []
		this.each(function (x) {
			if (!otherSet.has(x)) {
				needRemove.push(x)
			}
		})
		_.each(needRemove, function (x) {
			me.remove(x)
		})
		return this
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

	/** Empty the set and return a array of old elements */
	Set.prototype.clear = function () {
		var orignal = this._elements
		this._elements = []
		return orignal
	}

	return Set
})