define(function (require) {
	var repeat = require('./repeat')

	var ArrayNode = function () {
		this._parent = null
		this._children = []
	}

	ArrayNode.create = function () {
		return new ArrayNode()
	}

	/**
	 * get the parent node of this
	 */
	ArrayNode.prototype.parent = function () {
		return this._parent
	}


	/**
	 * iterate the children
	 * @param task
	 */
	ArrayNode.prototype.eachChild = function (task) {
		for (var i = 0; i < this._children.length; i++) {
			task(this._children[i], i)
		}
	}


	/**
	 * returns the count of children
	 */
	ArrayNode.prototype.childrenCount = function () {
		return this._children.length
	}


	/**
	 * returns the first child
	 */
	ArrayNode.prototype.firstChild = function () {
		return this._children[0]
	}

	/**
	 * return the last child
	 */
	ArrayNode.prototype.lastChild = function () {
		return this._children[this._children.length - 1]
	}


	/**
	 * return the i-th child
	 * @param i
	 */
	ArrayNode.prototype.child = function (i) {
		return this._children[i]
	}


	/**
	 * get the deepest and leftest descendant
	 */
	ArrayNode.prototype.leftestDescendant = function () {
		var current = this
		while (current._children.length != 0) {
			current = current.child(0)
		}
		return current
	}


	/**
	 * is same structure with another tree
	 * @param otherTreeRoot root of the tree
	 * @returns {boolean}
	 */
	ArrayNode.prototype.isSameStructure = function (otherTreeRoot) {
		if (this.childrenCount() != otherTreeRoot.childrenCount()) {
			return false
		}

		this.eachChild(function (child, i) {
			var compare = child.isSameStructure(otherTreeRoot._children[i])
			if (!compare) {
				return false
			}
		})

		return true
	}

	/**
	 * add child at last
	 */
	ArrayNode.prototype.addChildLast = function (child /** ... **/) {
		for (var i in arguments) {
			var child = arguments[i]
			this._children.push(child)
			child._parent = this
		}
		return this
	}

	/**
	 * add child to the index `i`
	 */
	ArrayNode.prototype.addChildAt = function (i, child) {
		this._children.splice(i, 0, child)
		child._parent = this
	}


	/**
	 * add a child to be the brother of this and after it
	 */
	ArrayNode.prototype.appendRightBrother = function (brother) {
		var brothers = this.parent()._children
		for (var i in brothers) {
			if (brothers[i] == this) {
				this.parent().addChildAt(i + 1, brother)
			}
		}
	}


	/**
	 * break the relation between parent and this
	 * if it's root, do nothing
	 */
	ArrayNode.prototype.cut = function () {
		if (this.parent()) {
			var index = this.parent()._children.indexOf(this)
			this.parent()._children.splice(index, 1)
		}
	}


	/**
	 * print a xml tree, a debug method
	 */
	ArrayNode.prototype.toString = function () {
		var queue = [{
			node: this,
			deep: 0
		}]
		var str = ''

		while (queue.length > 0) {
			var element = queue.shift()
			str += repeat(element.deep * 4) + 'node' + '\n'
			for (var i in element.node._children) {
				var child = element.node._children[i]
				queue.push({
					node: child,
					deep: element.deep + 1
				})
			}
		}
		return str
	}


	return ArrayNode
})