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

	BinaryNode.prototype.setLeft = function (left) {
		this.setChild(0, left)
	}

	BinaryNode.prototype.setRight = function (right) {
		this.setChild(1, right)
	}

	return BinaryNode
})