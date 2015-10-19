var LinkedNode = require('./linked-node')

/** Linked structure aiming at process linked node */
var Linked = function () {
	this._head = null
	this._tail = null
	this._count = 0
}

Linked.prototype.head = function () {
	return this._head
}

Linked.prototype.tail = function () {
	return this._tail
}

Linked.prototype.count = function () {
	return this._count
}

Linked.prototype.each = function (operation) {
	if (!this.head()) {
		return false
	}

	var current = this.head()
	var i = 0
	while (current) {
		if (operation(current, i++)) {
			return true
		}
		current = current.next()
	}

	return false
}

Linked.prototype.insertAfter = function (node) {
	var next = node.next()
	var insertNode = new LinkedNode()
	node._next = insertNode
	insertNode._prev = node
	insertNode._next = next
	if (next) {
		next._prev = insertNode
	}
	if (node == this._tail) {
		this._tail = insertNode
	}
	this._count++
	return insertNode
}

Linked.prototype.insertBefore = function (node) {
	var prev = node.prev()
	var insertNode = new LinkedNode()
	insertNode._prev = prev
	insertNode._next = node
	node._prev = insertNode
	if (prev) {
		prev._next = insertNode
	}
	if (node == this._head) {
		this._head = insertNode
	}
	this._count++
	return insertNode
}

Linked.prototype.addLast = function () {
	if (this.tail()) {
		return this.insertAfter(this.tail())
	} else {
		var node = new LinkedNode()
		this._head = this._tail = node
		this._count++
		return node
	}
}


Linked.prototype.addFirst = function () {
	if (this.head()) {
		return this.insertBefore(this.head())
	} else {
		var node = new LinkedNode()
		this._head = this._tail = node
		this._count++
		return node
	}
}


Linked.prototype.remove = function (node) {
	var prev = node.prev()
	var next = node.next()
	node._prev = node._next = null
	if (prev) {
		prev._next = next
	} else {
		this._head = next
	}
	if (next) {
		next._prev = prev
	} else {
		this._tail = prev
	}
	this._count--
	return node
}

Linked.prototype.removeMany = function (nodes) {
	nodes.forEach(function (node) {
		this.remove(node)
	}.bind(this))
}

module.exports = Linked