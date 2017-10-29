import ArrayNode  from '../../../lib/tree/ordered/arrayOrderedNode'
import LinkedNode from '../../../lib/tree/ordered/linkedOrderedNode'
import QUnit = require('qunitjs')

const Nodes = [ /*ArrayNode,*/ LinkedNode]

QUnit.module('ArrayOrderedNode/LinkedOrderedNode')

function checkChildren(assert, node, children) {
    let last = null
    node.eachChild(function (child, index) {
        assert.equal(child, children[index])
        last = child
    })
    assert.equal(node.childrenCount(), children.length)
    if (children.length > 0) {
        assert.equal(node.leftmostChild(), children[0])
        assert.equal(last, children[children.length - 1])
    }
}

// QUnit.test('constructor', function (assert) {
//     for (let i in Nodes) {
//         let node = new Nodes[i]()
//         assert.equal(node.parent(), null)
//     }
// })


QUnit.test('parent()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n1   = new Node
        let n2   = new Node
        assert.equal(root.parent(), null)

        root.addChildLast(n1)
        assert.equal(n1.parent(), root)

        n1.addChildLast(n2)
        assert.equal(n1.parent(), root)
        assert.equal(n2.parent(), n1)
    }
})

QUnit.test('eachChild(): no break', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n1   = new Node
        let n2   = new Node
        let n3   = new Node
        root.addChildLast(n1).addChildLast(n2).addChildLast(n3)

        let children = [n1, n2, n3]
        let count    = 0
        assert.ok(!root.eachChild(function (child, index) {
            assert.equal(child, children[index])
            count++
        }))
        assert.equal(count, 3)
    }
})

QUnit.test('childAt()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n1   = new Node
        let n2   = new Node
        root.addChildLast(n1).addChildLast(n2)

        assert.equal(root.childAt(0), n1)
        assert.equal(root.childAt(1), n2)
    }
})

QUnit.test('eachChild(): has break', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        root.addChildLast(new Node).addChildLast(new Node).addChildLast(new Node)

        let end = 0
        assert.ok(root.eachChild(function (child, index) {
            end = index
            if (index == 1) {
                return true
            }
        }))
        assert.equal(end, 1)
    }
})


QUnit.test('childrenCount()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        assert.equal(root.childrenCount(), 0)

        root.addChildLast(new Node)
        assert.equal(root.childrenCount(), 1)

        root.addChildLast(new Node)
        assert.equal(root.childrenCount(), 2)
    }
})


QUnit.test('leftmostChild()/rightmostChild()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n1   = new Node
        let n2   = new Node
        let n3   = new Node
        assert.equal(root.leftmostChild(), null)
        assert.equal(root.rightmostChild(), null)

        root.addChildLast(n1)
        assert.equal(root.leftmostChild(), n1)
        assert.equal(root.rightmostChild(), n1)

        root.addChildLast(n2).addChildLast(n3)
        assert.equal(root.leftmostChild(), n1)
        assert.equal(root.rightmostChild(), n3)
    }
})


QUnit.test('addChildFirst()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n1   = new Node
        let n2   = new Node
        root.addChildFirst(n1).addChildFirst(n2)

        checkChildren(assert, root, [n2, n1])
    }
})

QUnit.test('addChildLast()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n1   = new Node
        let n2   = new Node
        root.addChildLast(n1).addChildLast(n2)

        checkChildren(assert, root, [n1, n2])
    }
})


QUnit.test('leftmostDescendant', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]

        let root = new Node
        let n1   = new Node
        let n2   = new Node
        let n3   = new Node
        assert.equal(root.leftmostDescendant(), root)

        root.addChildLast(n1)
        assert.equal(root.leftmostDescendant(), n1)

        root.addChildLast(n2)
        assert.equal(root.leftmostDescendant(), n1)

        n1.addChildLast(n3)
        assert.equal(root.leftmostDescendant(), n3)
    }
})

QUnit.test('rightmostDescendant', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]

        let root = new Node
        let n1   = new Node
        let n2   = new Node
        let n3   = new Node
        assert.equal(root.rightmostDescendant(), root)

        root.addChildLast(n1)
        assert.equal(root.rightmostDescendant(), n1)

        root.addChildLast(n2)
        assert.equal(root.rightmostDescendant(), n2)

        n2.addChildLast(n3)
        assert.equal(root.rightmostDescendant(), n3)
    }
})


QUnit.test('isostructural(): right case', function (assert) {
    let root = []
    for (let i in Nodes) {
        let Node = Nodes[i]

        root[i] = new Node
        let n0  = new Node
        let n1  = new Node
        let n2  = new Node
        root[i].addChildLast(n0)
        root[i].addChildLast(n1)
        n1.addChildLast(n2)

        assert.ok(root[i].isostructural(root[i]))
        assert.ok(!root[i].isostructural(n2))
    }

    root[0].isostructural(root[1])
})


QUnit.test('isostructural(): wrong case', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]

        // tree1
        let root1 = new Node
        let n1    = new Node
        root1.addChildLast(new Node).addChildLast(n1)
        n1.addChildLast(new Node)

        // tree2
        let root2 = new Node
        root2.addChildLast(new Node)

        assert.ok(!root1.isostructural(root2))
        assert.ok(!root2.isostructural(root1))
    }
})

QUnit.test('toString()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n0   = new Node
        let n1   = new Node
        let n2   = new Node
        let n3   = new Node
        root.addChildLast(n0).addChildLast(n1).addChildLast(n3)
        n1.addChildLast(n2)

        let str =
                'node\n' +
                '    node\n' +
                '    node\n' +
                '        node\n' +
                '    node\n'
        assert.equal(root.toString(), str)
    }
})


QUnit.test('postorderWalk()/preorderWalk()', function (assert) {
    for (let i in Nodes) {
        let Node = Nodes[i]
        let root = new Node
        let n0   = new Node
        let n1   = new Node
        let n2   = new Node
        let n3   = new Node
        root.addChildLast(n0).addChildLast(n1)
        n0.addChildLast(n2)
        n1.addChildLast(n3)

        // post order
        let nodes = []
        root.postorderWalk(function (node) {
            nodes.push(node)
        })
        assert.deepEqual(nodes, [n2, n0, n3, n1, root])

        // pre order
        nodes = []
        root.preorderWalk(function (node) {
            nodes.push(node)
        })
        assert.deepEqual(nodes, [root, n0, n2, n1, n3])
    }
})
