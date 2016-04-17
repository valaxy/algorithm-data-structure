define(function (require) {
	var dfs = require('cjs!lib/search/deep-first')

	QUnit.module('deep-first-search')

	QUnit.test('linear search one by one', function (assert) {
		var enterResult = []
		var findResult = []
		dfs({
			initial: 0,
			next   : function (x, push) {
				if (x <= 3) {
					push(x + 1)
				}
			},
			enter  : function (x) {
				enterResult.push(x)
			},
			find   : function (x) {
				findResult.push(x)
			}
		})

		assert.ok(findResult, [0, 1, 2, 3, 4])
		assert.ok(enterResult, [0, 1, 2, 3, 4])
	})

	QUnit.test('two way search', function (assert) {
		var enterResult = []
		var findResult = []
		dfs({
			initial: 1,
			next   : function (x, push) {
				if (x * 2 < 10) {
					push(x * 2)
				}
				if (x * 3 < 10) {
					push(x * 3)
				}
			},
			enter  : function (x) {
				enterResult.push(x)
			},
			find   : function (x) {
				findResult.push(x)
			}
		})

		assert.ok(enterResult, [1, 3, 9, 6, 2, 6, 4, 8])
		assert.ok(findResult, [1, 2, 3, 6, 9, 4, 6, 8])
	})
})