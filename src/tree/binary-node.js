define(function (require) {
	var FixBaseNode = require('./base/fix-node-base')

	var BinaryNode = function () {
		this._children = [null, null]
		this._parent = null
	}

	BinaryNode.prototype = new FixBaseNode


	BinaryNode.prototype.left = function () {
		return this._children[0]
	}

	BinaryNode.prototype.right = function () {
		return this._children[1]
	}

	BinaryNode.prototype.hasLeft = function () {
		return this._children[0] ? true : false
	}

	BinaryNode.prototype.hasRight = function () {
		return this._children[1] ? true : false
	}

	BinaryNode.prototype.setLeft = function (left) {
		this.setChild(0, left)
	}

	BinaryNode.prototype.setRight = function (right) {
		this.setChild(1, right)
	}


	/**
	 * 前序遍历
	 */
	BinaryNode.prototype.preorderWalk = function (operation) {
		return operation(this)
			|| (this.hasLeft() ? this.left().preorderWalk(operation) : false)
			|| (this.hasRight() ? this.right().preorderWalk(operation) : false)
	}


	/**
	 * 中序遍历
	 */
	BinaryNode.prototype.inorderWalk = function (operation) {
		return (this.hasLeft() ? this.left().inorderWalk(operation) : false)
			|| operation(this)
			|| (this.hasRight() ? this.right().inorderWalk(operation) : false)
	}


	/**
	 * 后序遍历
	 */
	BinaryNode.prototype.postorderWalk = function (operation) {
		return (this.hasLeft() ? this.left().postorderWalk(operation) : false)
			|| (this.hasRight() ? this.right().postorderWalk(operation) : false)
			|| operation(this)
	}

	return BinaryNode
})