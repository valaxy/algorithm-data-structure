(function (factory) {
	if (typeof exports === 'object') {
		var result = factory(require, exports, module)
		if (result) {
			module.exports = result
		}
	} else {
		define(factory)
	}
})(function () {

	// 集合
	var Set = function () {
		this._elements = []
	}

	Set.createByArray = function (elements) {
		var s = new Set
		for (var i in elements) {
			s.add(elements[i])
		}
		return s
	}


	Set.prototype.has = function (element) {
		return this._elements.indexOf(element) >= 0
	}

	Set.prototype.hasOneOf = function (elements) {
		for (var i in elements) {
			if (this.has(elements[i])) {
				return true
			}
		}
		return false
	}

	Set.prototype.hasAll = function (elements) {
		for (var i in elements) {
			if (!this.has(elements[i])) {
				return false
			}
		}
		return true
	}


	Set.prototype.each = function (operation) {
		for (var i in this._elements) {
			var element = this._elements[i]
			if (operation(element)) {
				return true
			}
		}
		return false
	}


	Set.prototype.toArray = function () {
		return [].concat(this._elements)
	}

	Set.prototype.add = function (element) {
		for (var i in this._elements) {
			if (this._elements[i] === element) {
				return false
			}
		}
		this._elements.push(element)
		return true
	}

	return Set
})