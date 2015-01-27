define(function (require) {
	var repeat = require('./repeat')

	var OrderedNodeBase = function () {
		// do nothing
	}

	/**
	 * get the deepest and leftest descendant
	 */
	OrderedNodeBase.prototype.leftestDescendant = function () {
		var current = this
		while (true) {
			var child = current.firstChild()
			if (!child) {
				return current
			} else {
				current = child
			}
		}
	}


	/**
	 * is same structure with other tree
	 * @param otherTreeRoot root of the tree
	 * @returns {boolean} true or false
	 */
	OrderedNodeBase.prototype.isSameStructure = function (otherTreeRoot) {
		if (this.maxChildrenCount() != otherTreeRoot.maxChildrenCount()) {
			return false
		}

		// this tree
		var children = []
		this.eachChild(function (child) {
			children.push(child)
		})

		// other tree
		var isBreak = otherTreeRoot.eachChild(function (child, i) {
			var compare = children[i].isSameStructure(child)
			if (!compare) {
				return true
			}
		})

		return !isBreak
	}


	// dfs to build
	OrderedNodeBase.prototype._toString = function (deep) {
		var str = ''
		str += repeat(deep * 4) + 'node' + '\n'

		this.eachChild(function (child) {
			str += child._toString(deep + 1)
		})
		return str
	}

	/**
	 * print a xml tree, a debug method
	 */
	OrderedNodeBase.prototype.toString = function () {
		return this._toString(0)
	}

	return OrderedNodeBase
})