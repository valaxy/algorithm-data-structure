define(function (require) {
	var BinaryTreeNode = require('./binary-node')

	var BinarySearchTree = function (compare) {
		this._compare = compare
		this._root = new BinaryTreeNode
	}


	BinarySearchTree.prototype.each = function (operation) {

	}

	BinarySearchTree.prototype.insert = function (element) {
		if (!this._root) {
			var node = new BinaryTreeNode
			node.element = element
			this._root = node
			return
		}

		var x = this._root
		while (true) {
			if (this._compare(element, x) < 0) {
				if (!x.left()) {
					element.setLeft(x)
					return
				} else {
					x = x.left()
				}
			} else {
				if (!x.right()) {
					element.setRight(x)
					return
				} else {
					x = x.right()
				}
			}
		}
	}


	BinarySearchTree.prototype.remove = function (element) {

	}


	BinarySearchTree.prototype.min = function () {
		var x = this._root
		while (true) {
			if (!x.left()) {
				return x
			}
			x = x.left()
		}
	}


	BinarySearchTree.prototype.max = function () {
		var x = this._root
		while (true) {
			if (!x.right()) {
				return x
			}
			x = x.right()
		}
	}

	BinarySearchTree.prototype.has = function (element) {
		var x = this._root
		while (true) {
			if (x == null) {
				return false
			}
			var result = this._compare(element, x)
			if (result == 0) {
				return true
			}
			if (result < 0) {
				x = x.left()
			} else {
				x = x.right()
			}
		}
	}

	return BinarySearchTree
})