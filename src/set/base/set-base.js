define(function () {
	var SetBase = function () {
		// this._elements = []
	}

	/** Return a array of elements */
	SetBase.prototype.toArray = function () {
		return [].concat(this._elements)
	}

	/** Return the count of elements of set */
	SetBase.prototype.count = function () {
		return this._elements.length
	}

	/** Check if the set is empty */
	SetBase.prototype.isEmpty = function () {
		return this.count() === 0
	}

	/** Check if has one of `elements` */
	SetBase.prototype.hasOneOf = function (elements) {
		for (var i in elements) {
			if (this.has(elements[i])) {
				return true
			}
		}
		return false
	}

	/** Check if has all `elements` */
	SetBase.prototype.hasAll = function (elements) {
		for (var i in elements) {
			if (!this.has(elements[i])) {
				return false
			}
		}
		return true
	}

	/** Iterate each element and invoke `operation` */
	SetBase.prototype.each = function (operation) {
		for (var i in this._elements) {
			if (operation(this._elements[i])) {
				return true
			}
		}
		return false
	}

	/** Perform a union with `otherSet` and return this */
	SetBase.prototype.union = function (otherSet) {
		var me = this
		otherSet.each(function (x) {
			me.add(x)
		})
		return this
	}


	/** Perform an intersection with `otherSet` and return this */
	SetBase.prototype.intersect = function (otherSet) {
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


	/** Empty the set and return a array of old elements */
	SetBase.prototype.clear = function () {
		var orignal = this._elements
		this._elements = []
		return orignal
	}


	return SetBase
})