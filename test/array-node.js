define(function (require) {
	var ArrayNode = require('src/array-node')

	QUnit.module('ArrayNode')

	//QUnit.test('children()/addChildAt()', function (assert) {
	//	var root = ArrayNode.create()
	//	var n0 = ArrayNode.create()
	//	var n1 = ArrayNode.create()
	//	var n2 = ArrayNode.create()
	//	root.addChildLast(n1)
	//	root.addChildAt(1, n2)
	//	root.addChildAt(0, n0)
	//
	//	assert.equal(root.children()[0], n0)
	//	assert.equal(root.children()[1], n1)
	//	assert.equal(root.children()[2], n2)
	//	assert.equal(n2.parent(), root)
	//})

	QUnit.test('isSameStructure()', function (assert) {
		var root = ArrayNode.create()
		var n0 = ArrayNode.create()
		var n1 = ArrayNode.create()
		var n2 = ArrayNode.create()
		root.addChildLast(n0)
		root.addChildLast(n1)
		n1.addChildLast(n2)

		assert.ok(root.isSameStructure(root))
		assert.ok(!root.isSameStructure(n2))
	})


})