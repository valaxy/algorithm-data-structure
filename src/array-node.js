define(function () {

	var ArrayNode = function () {
		this._parent = null
		this._children = []
	}

	ArrayNode.create = function () {
		return new ArrayNode()
	}

	function repeat(times) {
		var str = ''
		for (var i = 0; i < times; i++) {
			str += ' '
		}
		return str
	}

	/**
	 * get the parent node of this
	 */
	ArrayNode.prototype.parent = function () {
		return this._parent
	}


	/**
	 * get the children array of this or get the index `i` of children
	 */
	ArrayNode.prototype.children = function (i) {
		if (typeof i != 'undefined') {
			return this._children[i]
		}
		return this._children
	}


	/**
	 * get the deepest and leftest descendant
	 */
	ArrayNode.prototype.leftestDescendant = function () {
		var current = this
		while (current.children().length != 0) {
			current = current.children(0)
		}
		return current
	}


	/**
	 * is same structure with another tree
	 * @param otherTreeRoot root of the tree
	 * @returns {boolean}
	 */
	ArrayNode.prototype.isSameStructure = function (otherTreeRoot) {
		if (this.children().length != otherTreeRoot.children().length) {
			return false
		}

		for (var i in this.children()) {
			var compare = this.children()[i].isSameStructure(otherTreeRoot.children()[i])
			if (!compare) {
				return false
			}
		}

		return true
	}

	/**
	 * add child at last
	 */
	ArrayNode.prototype.addChild = function (child /** ... **/) {
		for (var i in arguments) {
			var child = arguments[i]
			this.children().push(child)
			child._parent = this
		}
		return this
	}

	/**
	 * add child to the index `i`
	 */
	ArrayNode.prototype.addChildAt = function (i, child) {
		this.children().splice(i, 0, child)
		child._parent = this
	}


	/**
	 * add a child to be the brother of this and after it
	 */
	ArrayNode.prototype.appendBrother = function (brother) {
		var brothers = this.parent().children()
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
	ArrayNode.prototype.cut = function (child) {
		if (this.parent()) {
			var index = this.parent().children().indexOf(this)
			this.parent().children().splice(index, 1)
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
			for (var i in element.node.children()) {
				var child = element.node.children()[i]
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