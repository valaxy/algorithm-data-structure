define(function (require) {
	var FixBaseNode = require('./base/fix-node-base')

	var FixNode = function () {
		this._parent = null
		this._children = []
	}


	FixNode.prototype = new FixBaseNode


	/**
	 * Get the parent node of this
	 */
	FixNode.prototype.parent = function () {
		return this._parent
	}


	/**
	 * Iterate the children, child can be null
	 */
	FixNode.prototype.eachChild = function (operation) {
		for (var i = 0; i < this._children.length; i++) {
			var isBreak = operation(this._children[i], i)
			if (isBreak) {
				return true
			}
		}
		return false
	}


	/**
	 * returns the count of children
	 */
	FixNode.prototype.childrenCount = function () {
		return this._children.length
	}


	/**
	 * returns the first child or null
	 */
	FixNode.prototype.firstChild = function () {
		return this._children[0] || null
	}

	/**
	 * return the last child or null
	 */
	FixNode.prototype.lastChild = function () {
		return this._children[this._children.length - 1] || null
	}


	/**
	 * return the i-th child
	 * @param i
	 */
	FixNode.prototype.child = function (i) {
		return this._children[i]
	}


	/**
	 * add child at last
	 */
	FixNode.prototype.addChildLast = function (child /** ... **/) {
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
	FixNode.prototype.addChildAt = function (i, child) {
		this._children.splice(i, 0, child)
		child._parent = this
	}


	/**
	 * break the relation between parent and this
	 * if it's root, do nothing
	 */
	FixNode.prototype.cut = function () {
		if (this.parent()) {
			var index = this.parent()._children.indexOf(this)
			this.parent()._children.splice(index, 1)
		}
	}

	return FixNode
})


///**
// * add a child to be the brother of this and after it
// */
//ArrayNode.prototype.appendRightBrother = function (brother) {
//	var brothers = this.parent()._children
//	for (var i in brothers) {
//		if (brothers[i] == this) {
//			this.parent().addChildAt(i + 1, brother)
//		}
//	}
//}
