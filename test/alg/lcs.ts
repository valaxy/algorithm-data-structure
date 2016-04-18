import lcs, {Operation} from '../../lib/alg/lcs'

QUnit.module('lcs')


QUnit.test('empty', assert => {
    assert.deepEqual(lcs([], []), [])
})

QUnit.test('right empty', assert => {
    assert.deepEqual(lcs(['a'], []), [
        {type: Operation.addCopyOfX, index: 0}
    ])
    assert.deepEqual(lcs(['a', 'b', 'c'], []), [
        {type: Operation.addCopyOfX, index: 0},
        {type: Operation.addCopyOfX, index: 1},
        {type: Operation.addCopyOfX, index: 2}
    ])
})


QUnit.test('left empty', assert => {
    assert.deepEqual(lcs([], ['a', 'b']), [
        {type: Operation.addCopyOfY, index: 0},
        {type: Operation.addCopyOfY, index: 1}
    ])
})


QUnit.test('totally same', assert => {
    assert.deepEqual(lcs(['a'], ['a']), [])
    assert.deepEqual(lcs(['a', 'b'], ['a', 'b']), [])
})



QUnit.test('case', assert => {
    assert.deepEqual(lcs(['a'], ['b']), [
        {type: Operation.addCopyOfY, index: 0},
        {type: Operation.addCopyOfX, index: 0}
    ])
})


QUnit.test('case 2', assert => {
    assert.deepEqual(lcs(['a', 'b'], ['c', 'b']), [
        {type: Operation.addCopyOfY, index: 0},
        {type: Operation.addCopyOfX, index: 0}
    ])
})