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

	return SetBase
})