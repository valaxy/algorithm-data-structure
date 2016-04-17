var empty = function () {
	// nothing
}


var deepFirst = function (options) {
	var initial = options.initial
	var next = options.next
	var find = options.find || empty
	var enter = options.enter || empty
	var exit = options.exit || empty

	// deep-first use the FILO(先进后出) structure
	var stack = [].concat(initial)

	// when finding a state, call push(state)
	var push = function (state) {
		find(state)
		stack.push(state)
	}

	// find the initial state
	for (var i in initial) {
		var initialState = initial[i]
		find(initialState)
	}

	// start the search
	while (stack.length > 0) {
		var state = stack.pop()
		enter(state)
		next(state, push)
		exit(state)
	}

}

module.exports = deepFirst
