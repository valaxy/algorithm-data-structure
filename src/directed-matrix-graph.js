(function (factory) {
	if (typeof exports === 'object') {
		var result = factory(require, exports, module)
		if (result) {
			module.exports = result
		}
	} else {
		define(factory)
	}
})(function (require) {
	var Graph = function () {
		this._nodes = {}
	}

	Graph.createFromMatrix = function (matrix) {

	}

	return Graph

})