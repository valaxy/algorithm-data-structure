import Linked      = require('../../linked/linked')
import LinkedNode  = require('../../linked/linked-node')
import OrderedNode = require('./ordered-node')



/** Ordered Tree Node implemented by Linked */

class LinkedOrderedNode extends OrderedNode {
    private _parent = null               // parent node
    private _childLinked = new Linked    // linked of children node
    private _linkedNode = new LinkedNode // linked to sibling node

    /** Return parent node */
    parent() {
        return this._parent
    }

    childAt(index) {
        var node = null
        this.eachChild(function (n, i) {
            if (i == index) {
                node = n
                return true
            }
        })
        return node
    }

    /** Iterate each child */
    eachChild(operation) {
        return this._childLinked.each(function (linkedNode, i) {
            if (operation(linkedNode._treeNode, i)) {
                return true
            }
        })
    }

    /** Return how many children */
    childrenCount() {
        return this._childLinked.count()
    }

    /** If it exists, return leftmost child node, otherwise return null */
    leftmostChild() {
        var head = this._childLinked.head()
        return head ? head._treeNode : null
    }

    /** If it exists, return rightmost child node, otherwise return null */
    rightmostChild() {
        var tail = this._childLinked.tail()
        return tail ? tail._treeNode : null
    }

    /** Return left sibling node or null */
    leftSibling() {
        var prev = this._linkedNode.prev()
        return prev ? prev._treeNode : null
    }

    /** Return right sibling node or null */
    rightSibling() {
        var next = this._linkedNode.next()
        return next ? next._treeNode : null
    }

    /** Add child node of first */
    addChildFirst(node) {
        node._parent               = this
        node._linkedNode           = this._childLinked.addFirst(node)
        node._linkedNode._treeNode = node
        return this
    }

    /** Add child node of last */
    addChildLast(node) {
        node._parent               = this
        node._linkedNode           = this._childLinked.addLast(node)
        node._linkedNode._treeNode = node
        return this
    }

    /** Add to right sibling node */
    appendLeftSibling(node) {
        var linked                 = this.parent()._childLinked
        node._linkedNode           = linked.insertBefore(this._linkedNode, node)
        node._parent               = this.parent()
        node._linkedNode._treeNode = node
        return this
    }

    /** Add to left sibling node */
    appendRightSibing(node) {
        var linked                 = this.parent()._childLinked
        node._linkedNode           = linked.insertAfter(this._linkedNode, node)
        node._parent               = this.parent()
        node._linkedNode._treeNode = node
        return this
    }

    /** Cut parent link */
    cut() {
        if (this.parent()) {
            this.parent()._childLinked.remove(this._linkedNode)
            this._parent = null
            delete this._linkedNode
        }
        return this
    }

    /** can not delete root node for now */
    delete() {
        var parent     = this.parent()
        var parentLeft = parent.leftSibling()
        this.cut()
        this.eachChild(function (child) {
            child._parent = parent
            if (parentLeft) {
                parentLeft.appendRightSibing(child)
                parentLeft = parentLeft.rightSibling()
            } else {
                parent.addChildFirst(child)
            }
        })
        return this
    }
}

export = LinkedOrderedNode