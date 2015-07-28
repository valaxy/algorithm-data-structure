define(function () {

	// stack is too simple to implement & test
	var Stack = function () {
		this._ary = []
	}


	Stack.prototype.isEmpty = function () {
		return this._ary.length == 0
	}

	Stack.prototype.push = function (value) {
		this._ary.push(value)
	}

	Stack.prototype.pop = function () {
		return this._ary.pop()
	}

	Stack.prototype.peek = function () {
		return this._ary[this._ary.length - 1]
	}

	Stack.prototype.count = function () {

	}

	return Stack
})