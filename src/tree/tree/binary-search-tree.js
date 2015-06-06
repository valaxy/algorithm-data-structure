define(function (require) {
	var BinaryTreeNode = require('./../fix/binary-node')

	var BinarySearchTree = function (compare) {
		this._compare = compare
		this._root = null
		this._count = 0
	}


	BinarySearchTree.prototype.count = function () {
		return this._count
	}

	BinarySearchTree.prototype.each = function (operation) {
		if (this._root) {
			return this._root.inorderWalk(operation)
		}
		return false
	}


	BinarySearchTree.prototype.insert = function (value) {
		var insertNode = new BinaryTreeNode
		insertNode.value = value

		if (!this._root) {
			this._root = insertNode
			this._count++
			return
		}

		var node = this._root
		while (true) {
			if (this._compare(value, node.value) < 0) {
				if (!node.left()) {
					node.setLeft(insertNode)
					break
				} else {
					node = node.left()
				}
			} else {
				if (!node.right()) {
					node.setRight(insertNode)
					break
				} else {
					node = node.right()
				}
			}
		}

		this._count++
	}

	BinarySearchTree.prototype.insertMany = function (values) {
		var me = this
		_.each(values, function (value) {
			me.insert(value)
		})
	}

	// if find the node that equals then return the node
	// else return the node that will be the parent of new node
	BinarySearchTree.prototype._findNode = function (value) {

	}


	/** if multiply values meet, remove one randomly */
	BinarySearchTree.prototype.removeOne = function (value) {
		var node = this._root
		while (true) {
			var result = this._compare(value, node.value)
			if (result == 0) {
				this._remove(node)
			} else if (result < 0) {
				if (node.left()) {
					node = node.left()
				}
			} else {
				if (node.right()) {
					node = node.right()
				}
			}
		}
	}


	/** if multiply values meet, remove all of them */
	BinarySearchTree.prototype.removeMany = function (value) {

	}


	BinarySearchTree.prototype._remove = function (node) {

	}


	// 后继节点
	BinarySearchTree.prototype._successor = function (node) {
		if (node.hasRight()) {
			return this._minNode(node.right())
		}

		while (true) {
			var parent = node.parent()
			if (parent) {
				if (parent.left() == node) {
					return parent
				} else {
					node = parent
				}
			} else {
				return null
			}
		}
	}


	// 前驱节点
	BinarySearchTree.prototype._predecessor = function (node) {
		if (node.hasLeft()) {
			return this._maxNode(node.left())
		}

		while (true) {
			var parent = node.parent()
			if (parent) {
				if (parent.right() == node) {
					return parent
				} else {
					node = parent
				}
			} else {
				return null
			}
		}
	}

	BinarySearchTree.prototype._minNode = function (node) {
		var x = node
		while (true) {
			if (!x.hasLeft()) {
				return x
			}
			x = x.left()
		}
	}

	BinarySearchTree.prototype._maxNode = function (node) {
		var x = node
		while (true) {
			if (!x.hasRight()) {
				return x
			}
			x = x.right()
		}
	}


	BinarySearchTree.prototype.min = function () {
		var node = this._minNode(this._root)
		return node.value
	}


	BinarySearchTree.prototype.max = function () {
		var node = this._maxNode(this._root)
		return node.value
	}


	BinarySearchTree.prototype.has = function (value) {
		var node = this._root
		while (true) {
			if (node == null) {
				return false
			}
			var result = this._compare(value, node.value)
			if (result == 0) {
				return true
			}
			if (result < 0) {
				node = node.left()
			} else {
				node = node.right()
			}
		}
	}

	return BinarySearchTree
})