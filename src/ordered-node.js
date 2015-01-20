define(function (require) {
	var repeat = require('./repeat')

	var OrderedNode = function () {
		// do nothing
	}

	/**
	 * get the deepest and leftest descendant
	 */
	OrderedNode.prototype.leftestDescendant = function () {
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
	OrderedNode.prototype.isSameStructure = function (otherTreeRoot) {
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
			var compare = children[i].isSameStructure(child)
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

	/**
	 * print a xml tree, a debug method
	 */
	OrderedNode.prototype.toString = function () {
		return this._toString(0)
	}

	return OrderedNode
})