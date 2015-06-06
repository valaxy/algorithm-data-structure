define(function (require) {
	var repeat = require('../base/repeat')

	var FixNodeBase = function () {
		// nothing
	}

	/** Returns the parent node */
	FixNodeBase.prototype.parent = function () {
		return this._parent
	}

	/** Returns the (i+1)-th child, if it not exists then returns null */
	FixNodeBase.prototype.child = function (i) {
		return this._children[i]
	}


	/** Whether a child exist in the position i */
	FixNodeBase.prototype.hasChildAt = function (i) {
		return this._children[i] ? true : false
	}

	/** Returns the count of children which are not null */
	FixNodeBase.prototype.maxChildrenCount = function () {
		return this._children.length
	}


	/** Returns the max count of children */
	FixNodeBase.prototype.childrenCount = function () {
		return _.reduce(this._children, function (memo, node) {
			return memo + (node ? 1 : 0)
		}, 0)
	}


	/** Iterate the children, child can be null */
	FixNodeBase.prototype.eachChild = function (operation) {
		// because child can be null, so makes a range(0, length) iterate
		for (var i = 0; i < this._children.length; i++) {
			if (operation(this._children[i], i)) {
				return true
			}
		}
		return false
	}


	/** Set the (i+1)-th child */
	FixNodeBase.prototype.setChild = function (i, child) {
		if (this.hasChildAt(i)) {
			this._children[i]._parent = null
		}
		this._children[i] = child
		child._parent = this
		return this
	}

	/** Set children from 1-th to maxChildrenCount-th */
	FixNodeBase.prototype.setChildren = function (/* ... */) {
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i]) {
				this.setChild(i, arguments[i])
			}
		}
		return this
	}


	/** Check if it is isostructural with other tree */
	FixNodeBase.prototype.isostructural = function (otherNode) {
		if (this.maxChildrenCount() != otherNode.maxChildrenCount()) {
			return false
		}

		for (var i = 0; i < this.maxChildrenCount(); i++) {
			if (!this.hasChildAt(i)) {
				if (otherNode.hasChildAt(i)) {
					return false
				}
			} else if (!otherNode.hasChildAt(i)) {
				return false
			} else if (!this.child(i).isostructural(otherNode.child(i))) {
				return false
			}
		}

		return true
	}


	// core
	FixNodeBase.prototype._toString = function (deep) {
		var s = repeat(deep * 4) + 'node\n'
		this.eachChild(function (node) {
			if (node) {
				s += node._toString(deep + 1)
			} else {
				s += repeat(deep * 4 + 4) + 'null\n'
			}
		})
		return s
	}


	/** Return a string represents current tree */
	FixNodeBase.prototype.toString = function () {
		return this._toString(0)
	}


	return FixNodeBase
})


//
///** Returns the first child which exists from left to right,
// * if there is no one a child then returns null */
//FixNodeBase.prototype.leftestChild = function () {
//	for (var i in this._children) {
//		return this._children[i]
//	}
//	return null
//}
//
///** Returns the last child which exists from right to left,
// * if there is no one a child then returns null */
//FixNodeBase.prototype.rightestChild = function () {
//	for (var i = this._children.length - 1; i >= 0; i--) {
//		if (this._children[i]) {
//			return this._children[i]
//		}
//	}
//	return null
//}


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
