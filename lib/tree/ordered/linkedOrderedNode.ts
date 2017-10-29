import Linked from '../../linked/linked'
import LinkedNode from '../../linked/linkedNode'
import OrderedNode from './orderedNode'


interface InnerTreeNode extends LinkedNode<InnerTreeNode> {
    treeNode: any
}

/** Ordered Tree Node implemented by Linked */

export default class LinkedOrderedNode extends OrderedNode {
    private _parent: LinkedOrderedNode = null // parent node
    private _childLinked = new Linked<InnerTreeNode>() // linked of children node
    private _linkedNode: InnerTreeNode = new LinkedNode() as InnerTreeNode // linked to sibling node

    /** Return parent node */
    parent(): LinkedOrderedNode {
        return this._parent
    }

    childAt(index) {
        let node = null
        this.eachChild(function(n, i) {
            if (i == index) {
                node = n
                return true
            }
        })
        return node
    }

    /** Iterate each child */
    eachChild(operation) {
        return this._childLinked.each((linkedNode, i) => {
            if (operation(linkedNode.treeNode, i)) {
                return true
            }
        })
    }

    /** Return how many children */
    childrenCount() {
        return this._childLinked.count
    }

    /** If it exists, return leftmost child node, otherwise return null */
    leftmostChild() {
        let head = this._childLinked.head
        return head ? head.treeNode : null
    }

    /** If it exists, return rightmost child node, otherwise return null */
    rightmostChild() {
        let tail = this._childLinked.tail
        return tail ? tail.treeNode : null
    }

    /** Return left sibling node or null */
    leftSibling() {
        let prev = this._linkedNode.prev
        return prev ? prev.treeNode : null
    }

    /** Return right sibling node or null */
    rightSibling() {
        let next = this._linkedNode.next
        return next ? next.treeNode : null
    }

    /** Add child node of first */
    addChildFirst(node) {
        node._parent = this
        node._linkedNode = this._childLinked.addFirst()
        node._linkedNode.treeNode = node
        return this
    }

    /** Add child node of last */
    addChildLast(node) {
        node._parent = this
        node._linkedNode = this._childLinked.addLast()
        node._linkedNode.treeNode = node
        return this
    }

    /** Add to right sibling node */
    appendLeftSibling(node) {
        let linked = this.parent()._childLinked
        node._linkedNode = linked.insertBefore(this._linkedNode)
        node._parent = this.parent()
        node._linkedNode.treeNode = node
        return this
    }

    /** Add to left sibling node */
    appendRightSibing(node) {
        let linked = this.parent()._childLinked
        node._linkedNode = linked.insertAfter(this._linkedNode)
        node._parent = this.parent()
        node._linkedNode.treeNode = node
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
        let parent = this.parent()
        let parentLeft = parent.leftSibling()
        this.cut()
        this.eachChild((child) => {
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
