define(function (require) {
    var BinarySearchTree = require('cjs!src/tree/binary-search-tree')
    var Node             = require('cjs!src/tree/binary-node')

    var case0
    var root
    var n2, n3, n4, n6, n7, n9, n13, n15, n17, n18, n20
    var sorted
    var nodes


    QUnit.module('BinarySearchNode', {
        beforeEach: function () {
            // case0: from 《算法导论》12章 二叉查找树
            case0 = new BinarySearchTree(function (x, y) {
                return x - y
            })
            case0.insertMany([15, 6, 18, 7, 3, 4, 2, 13, 9, 20, 17])
            n15 = case0._root
            n6  = n15.left()
            n18 = n15.right()
            n3  = n6.left()
            n7  = n6.right()
            n17 = n18.left()
            n20 = n18.right()
            n2  = n3.left()
            n4  = n3.right()
            n13 = n7.right()
            n9  = n13.left()

            // create the structure manually
            root = new Node
            root.setChildren(
                new Node().setChildren(
                    new Node().setChildren(
                        new Node,
                        new Node
                    ),
                    new Node().setChildren(
                        null,
                        new Node().setChildren(
                            new Node,
                            null
                        )
                    )
                ),
                new Node().setChildren(
                    new Node,
                    new Node
                )
            )

            sorted = [2, 3, 4, 6, 7, 9, 13, 15, 17, 18, 20]
            nodes  = [null, n2, n3, n4, n6, n7, n9, n13, n15, n17, n18, n20, null]
        }
    })


    QUnit.test('case0', function (assert) {
        assert.ok(root.isostructural(case0._root))
    })

    QUnit.test('_successor() of case0', function (assert) {
        for (var i = 1; i < nodes.length - 1; i++) {
            assert.equal(case0._successor(nodes[i]), nodes[i + 1])
        }
    })

    QUnit.test('_predecessor() of case0', function (assert) {
        for (var i = 1; i < nodes.length - 1; i++) {
            assert.equal(case0._predecessor(nodes[i]), nodes[i - 1])
        }
    })

    QUnit.test('_minNode() of case0', function (assert) {
        var minNodes = [n2, n2, n4, n2, n7, n9, n9, n2, n17, n17, n20]
        for (var i = 0; i < minNodes.length; i++) {
            assert.equal(case0._minNode(nodes[i + 1]), minNodes[i])
        }
    })

    QUnit.test('_maxNode() of case0', function (assert) {
        var maxNodes = [n2, n4, n4, n13, n13, n9, n13, n20, n17, n20, n20]
        for (var i = 0; i < maxNodes.length; i++) {
            assert.equal(case0._maxNode(nodes[i + 1]), maxNodes[i])
        }
    })


    QUnit.test('has()', function (assert) {
        var tree = new BinarySearchTree(function (x, y) {
            return x - y
        })
        assert.ok(!tree.has(100))

        tree.insertMany([100, 50, 150])
        assert.ok(tree.has(100))
        assert.ok(tree.has(50))
        assert.ok(tree.has(150))
    })


    QUnit.test('min() of case0', function (assert) {
        assert.equal(case0.min(), 2)
    })

    QUnit.test('max() of case0', function (assert) {
        assert.equal(case0.max(), 20)
    })

    QUnit.test('count() of case0', function (assert) {
        assert.equal(case0.count(), 11)
    })


    QUnit.test('insert()', function (assert) {
        var tree = new BinarySearchTree(function (x, y) {
            return x - y
        })

        // insert in a empty tree
        tree.insert(100)
        var root = new Node
        assert.ok(root.isostructural(tree._root))

        // insert left of root
        tree.insert(50)
        var n1 = new Node
        root.setChild(0, n1)
        assert.ok(root.isostructural(tree._root))

        // insert right of root
        tree.insert(200)
        var n2 = new Node
        root.setChild(1, n2)
        assert.ok(root.isostructural(tree._root))

        // insert deep left
        tree.insert(0)
        var n3 = new Node
        n1.setChild(0, n3)
        assert.ok(root.isostructural(tree._root))

        // insert at left of deep right
        tree.insert(150)
        var n4 = new Node
        n2.setChild(0, n4)
        assert.ok(root.isostructural(tree._root))
    })

    QUnit.test('insertMany()', function (assert) {
        var tree = new BinarySearchTree(function (x, y) {
            return x - y
        })
        tree.insertMany([1, 2, 3])
        assert.equal(tree.count(), 3)
    })


    //test('remove()', function (assert) {
    //
    //})


})