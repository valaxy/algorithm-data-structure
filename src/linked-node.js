define(function (require) {
	var LinkedListNode = require('bower_components/linked-list/src/linked-node')
	var LinkedList = require('bower_components/linked-list/src/linked-list')

	var LinkedNode = function () {
		this._parent = null
		this._childList = new LinkedList
		this._linked = null
	}

	LinkedNode.prototype.parent = function () {
		return this._parent
	}

	LinkedNode.prototype.eachChild = function (task) {
		var current = this._childList.head()
		var i = 0
		while (current) {
			task(current._treeNode, i++)
			current = current.next()
		}
	}

	LinkedNode.prototype.firstChild = function () {
		var head = this._childList.head()
		return head ? head._treeNode : null
	}

	LinkedNode.prototype.lastChild = function () {
		var tail = this._childList.tail()
		return tail ? tail._treeNode : null
	}

	LinkedNode.prototype.leftBrother = function () {
		var prev = this._linked.prev()
		return prev ? prev._treeNode : null
	}

	LinkedNode.prototype.rightBrother = function () {
		var next = this._linked.next()
		return next ? next._treeNode : null
	}

	LinkedNode.prototype.addChildFirst = function (node /* ... */) {
		for (var i in arguments) {
			var node = arguments[i]
			var listNode = this._childList.addFirst(new LinkedListNode)
			listNode._treeNode = node
			node._parent = this
			node._linked = listNode
		}
	}

	LinkedNode.prototype.addChildLast = function (node /* ... */) {
		for (var i in arguments) {
			var node = arguments[i]
			var listNode = this._childList.addLast(new LinkedListNode)
			listNode._treeNode = node
			node._parent = this
			node._linked = listNode
		}
	}

	LinkedNode.prototype.appendLeftBrother = function (node) {
		var listNode = this._childList.insertBefore(this._linked, new LinkedListNode)
		listNode._treeNode = node
		node._parent = this.parent()
	}

	LinkedNode.prototype.appendRightBrother = function (node) {
		var listNode = this._childList.insertAfter(this._linked, new LinkedListNode)
		listNode._treeNode = node
		node._parent = this.parent()
	}


	LinkedNode.prototype.cut = function () {
		if (this.parent()) {
			this.parent()._childList.remove(this._linked)
			this._parent = null
			delete this._linked
		}
	}

	return LinkedNode
})