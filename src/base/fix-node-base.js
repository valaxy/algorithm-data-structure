define(function () {

	var FixNodeBase = function () {
		// nothing
	}

	/**
	 * Get the parent node of this
	 */
	FixNodeBase.prototype.parent = function () {
		return this._parent
	}

	/**
	 * Return the (i+1)-th child, can be null
	 */
	FixNodeBase.prototype.child = function (i) {
		return this._children[i]
	}

	/**
	 * returns the count of children
	 */
	FixNodeBase.prototype.childrenCount = function () {
		return this._children.length
	}


	/**
	 * Iterate the children, child can be null
	 */
	FixNodeBase.prototype.eachChild = function (operation) {
		// because child can be null, so makes a range(0, length) iterate
		for (var i = 0; i < this._children.length; i++) {
			if (operation(this._children[i], i)) {
				return true
			}
		}
		return false
	}


	/**
	 * Set the (i+1)-th child
	 */
	FixNodeBase.prototype.setChild = function (i, child) {
		this._children[i] = child
		child._parent = this
	}


	///**
	// * Break the relation between parent and this,
	// * if it's root, do nothing
	// */
	//FixNodeBase.prototype.cut = function () {
	//	if (this.parent()) {
	//		var index = this.parent()._children.indexOf(this)
	//		this.parent()._children.setChild(index, null)
	//	}
	//}

	return FixNodeBase
})