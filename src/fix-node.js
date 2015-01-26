define(function (require) {
	var FixBaseNode = require('./base/fix-node-base')

	var FixNode = function (n) {
		this._parent = null
		this._children = new Array(n)
		for (var i in this._children) {
			this._children[i] = null
		}
	}


	FixNode.prototype = new FixBaseNode


	return FixNode
})


