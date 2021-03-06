import fullPermutation from '../../lib/alg/fullPermutation'
import QUnit = require('qunitjs')

QUnit.module('fullPermutation')

QUnit.test('fullPermutation()', function (assert) {
    fullPermutation([], function () {
        assert.ok(false)
    })

    fullPermutation([1], function (elements) {
        assert.deepEqual(elements, [1])
    })


    let perms = [
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

    let i = 0
    fullPermutation([1, 2, 3, 4], function (elements) {
        assert.deepEqual(elements, perms[i++])
    })

    assert.equal(i, 24)
})
