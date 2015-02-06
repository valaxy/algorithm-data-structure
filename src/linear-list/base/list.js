define(function () {
	var List = function () {
		// nothing
	}

	List.prototype.removeFirst = function () {
		return this.removeAt(0)
	}

	List.prototype.removeLast = function () {
		return this.removeAt(this.count() - 1)
	}

	return List
})