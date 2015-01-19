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
		otherTreeRoot.eachChild(function (child, i) {
			var compare = children[i].isSameStructure(child)
			if (!compare) {
				return false
			}
		})

		return true
	}


	/**
	 * print a xml tree, a debug method
	 */
	OrderedNode.prototype.toStringTree = function () {
		var queue = [{
			node: this,
			deep: 0
		}]
		var str = ''

		while (queue.length > 0) {
			var element = queue.shift()
			str += repeat(element.deep * 4) + 'node' + '\n'
			element.node.eachChild(function (child) {
				queue.push({
					node: child,
					deep: element.deep + 1
				})
			})
		}
		return str
	}

	return OrderedNode
})