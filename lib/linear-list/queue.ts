var LinkedList = require('./linked-list')

var Queue = function () {
	this._list = new LinkedList
}

Queue.prototype.isEmpty = function () {
	return this._list.isEmpty()
}

Queue.prototype.peek = function () {
	return this._list.first()
}

Queue.prototype.dequeue = function () {
	var value = this.peek()
	this._list.removeFirst()
	return value
}

Queue.prototype.inqueue = function (value) {
	this._list.addLast(value)
	return this
}

Queue.prototype.count = function () {
	return this._list.count()
}

module.exports = Queue
