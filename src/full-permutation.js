define(function () {
	var swap = function (elements, i, j) {
		var temp = elements[i]
		elements[i] = elements[j]
		elements[j] = temp
	}

	// calculate the count of full permutation of last `deep` elements
	var perm = function (elements, deep, callback) {
		if (deep == 1) {
			return callback(elements)
		} else {
			var firstIndex = elements.length - deep
			for (var i = firstIndex; i < elements.length; i++) {
				swap(elements, firstIndex, i)
				if (perm(elements, deep - 1, callback)) {
					return true
				}
				swap(elements, firstIndex, i)
			}
		}
	}

	var fullPermutation = function (elements, callback) {
		if (elements.length > 0) {
			perm(elements, elements.length, callback)
		}
	}

	if (typeof QUnit != 'undefined') {
		QUnit.module('full-permutation')

		QUnit.test('fullPermutation()', function (assert) {
			fullPermutation([], function () {
				assert.ok(false)
			})

			fullPermutation([1], function (elements) {
				assert.deepEqual(elements, [1])
			})


			var perms = [
				[1, 2, 3, 4],
				[1, 2, 4, 3],
				[1, 3, 2, 4],
				[1, 3, 4, 2],
				[1, 4, 3, 2],
				[1, 4, 2, 3],

				[2, 1, 3, 4],
				[2, 1, 4, 3],
				[2, 3, 1, 4],
				[2, 3, 4, 1],
				[2, 4, 3, 1],
				[2, 4, 1, 3],

				[3, 2, 1, 4],
				[3, 2, 4, 1],
				[3, 1, 2, 4],
				[3, 1, 4, 2],
				[3, 4, 1, 2],
				[3, 4, 2, 1],

				[4, 2, 3, 1],
				[4, 2, 1, 3],
				[4, 3, 2, 1],
				[4, 3, 1, 2],
				[4, 1, 3, 2],
				[4, 1, 2, 3]
			]

			var i = 0
			fullPermutation([1, 2, 3, 4], function (elements) {
				assert.deepEqual(elements, perms[i++])
			})

			assert.equal(i, 24)
		})
	}

	return fullPermutation
})