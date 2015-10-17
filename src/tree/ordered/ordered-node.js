var repeat = require('../base/repeat')

var OrderedNode = function () {
	// nothing
}

OrderedNode.extend = function (cls) {
	var n = new OrderedNode
	cls.prototype = n
}

//OrderedNode.prototype.value = function () {
//	return this._value
//}
//
//OrderedNode.prototype.setValue = function (value) {
//	this._value = value
//}

/** Return the deepest and leftmost descendant, including itself */
OrderedNode.prototype.leftmostDescendant = function () {
	var current = this
	while (true) {
		var child = current.leftmostChild()
		if (!child) {
			return current
		} else {
			current = child
		}
	}
}

/** Return the deepest and rightmost descendant, including itself */
OrderedNode.prototype.rightmostDescendant = function () {
	var current = this
	while (true) {
		var child = current.rightmostChild()
		if (!child) {
			return current
		} else {
			current = child
		}
	}
}


/** Check if it is same structure with other tree
 * @param otherTreeRoot root of the tree
 * @returns {boolean} true or false */
OrderedNode.prototype.isostructural = function (otherTreeRoot) {
	if (this.childrenCount() != otherTreeRoot.childrenCount()) {
		return false
	}

	// this tree
	var children = []
	this.eachChild(function (child) {
		children.push(child)
	})

	// other tree
	var isBreak = otherTreeRoot.eachChild(function (child, i) {
		var compare = children[i].isostructural(child)
		if (!compare) {
			return true
		}
	})

	return !isBreak
}


// dfs to build
OrderedNode.prototype._toString = function (deep) {
	var str = ''
	str += repeat(deep * 4) + 'node' + '\n'

	this.eachChild(function (child) {
		str += child._toString(deep + 1)
	})
	return str
}

/** Print a xml tree, a debug method */
OrderedNode.prototype.toString = function () {
	return this._toString(0)
}


OrderedNode.prototype.postorderWalk = function (operation) {
	return this.eachChild(function (child) {
			if (child.postorderWalk(operation)) {
				return true
			}
		}) || operation(this)
}

OrderedNode.prototype.preorderWalk = function (operation) {
	return operation(this)
		|| this.eachChild(function (child) {
			if (child.preorderWalk(operation)) {
				return true
			}
		})
}

module.exports = OrderedNode