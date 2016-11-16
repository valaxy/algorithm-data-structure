var Linked = require('../../linked/linked')
var LinkedNode = require('../../linked/linked-node')
var OrderedNode = require('./ordered-node')

/** Ordered Tree Node implemented by Linked */
var LinkedOrderedNode = function () {
	this._parent = null               // parent node
	this._childLinked = new Linked    // linked of children node
	this._linkedNode = new LinkedNode // linked to sibling node
}

OrderedNode.extend(LinkedOrderedNode)


LinkedOrderedNode.extend = function (cls) {
	var n = new LinkedOrderedNode
	delete n._parent
	delete n._childLinked
	delete n._linkedNode
	cls.prototype = n
}


/** Return parent node */
LinkedOrderedNode.prototype.parent = function () {
	return this._parent
}

LinkedOrderedNode.prototype.childAt = function (index) {
	var node = null
	this.eachChild(function (n, i) {
		if (i == index) {
			node = n
			return true
		}
	})
	return node
}

/** Iterate each child */
LinkedOrderedNode.prototype.eachChild = function (operation) {
	return this._childLinked.each(function (linkedNode, i) {
		if (operation(linkedNode._treeNode, i)) {
			return true
		}
	})
}

/** Return how many children */
LinkedOrderedNode.prototype.childrenCount = function () {
	return this._childLinked.count()
}

/** If it exists, return leftmost child node, otherwise return null */
LinkedOrderedNode.prototype.leftmostChild = function () {
	var head = this._childLinked.head()
	return head ? head._treeNode : null
}

/** If it exists, return rightmost child node, otherwise return null */
LinkedOrderedNode.prototype.rightmostChild = function () {
	var tail = this._childLinked.tail()
	return tail ? tail._treeNode : null
}

/** Return left sibling node or null */
LinkedOrderedNode.prototype.leftSibling = function () {
	var prev = this._linkedNode.prev()
	return prev ? prev._treeNode : null
}

/** Return right sibling node or null */
LinkedOrderedNode.prototype.rightSibling = function () {
	var next = this._linkedNode.next()
	return next ? next._treeNode : null
}

/** Add child node of first */
LinkedOrderedNode.prototype.addChildFirst = function (node) {
	node._parent = this
	node._linkedNode = this._childLinked.addFirst(node)
	node._linkedNode._treeNode = node
	return this
}

/** Add child node of last */
LinkedOrderedNode.prototype.addChildLast = function (node) {
	node._parent = this
	node._linkedNode = this._childLinked.addLast(node)
	node._linkedNode._treeNode = node
	return this
}

/** Add to right sibling node */
LinkedOrderedNode.prototype.appendLeftSibling = function (node) {
	var linked = this.parent()._childLinked
	node._linkedNode = linked.insertBefore(this._linkedNode, node)
	node._parent = this.parent()
	node._linkedNode._treeNode = node
	return this
}

/** Add to left sibling node */
LinkedOrderedNode.prototype.appendRightSibing = function (node) {
	var linked = this.parent()._childLinked
	node._linkedNode = linked.insertAfter(this._linkedNode, node)
	node._parent = this.parent()
	node._linkedNode._treeNode = node
	return this
}

/** Cut parent link */
LinkedOrderedNode.prototype.cut = function () {
	if (this.parent()) {
		this.parent()._childLinked.remove(this._linkedNode)
		this._parent = null
		delete this._linkedNode
	}
	return this
}

/** can not delete root node for now */
LinkedOrderedNode.prototype.delete = function () {
	var parent = this.parent()
	var parentLeft = parent.leftSibling()
	this.cut()
	this.eachChild(function (child) {
		child._parent = parent
		if (parentLeft) {
			parentLeft.appendRightSibing(child)
			parentLeft = parentLeft.rightSibling()
		} else {
			parent.addChildFirst(child)
		}
	})
	return this
}

export = LinkedOrderedNode