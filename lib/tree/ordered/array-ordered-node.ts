import OrderedNode = require('./ordered-node')
import _ = require('underscore')


class ArrayOrderedNode extends OrderedNode {
    private _parent
    private _children

    constructor() {
        super()
    }

    parent() {
        return this._parent
    }

    childAt = function (index) {
        return this._children[index]
    }

    eachChild(operation) {
        for (var i in this._children) {
            if (operation(this._children[i], i)) {
                return true
            }
        }
        return false
    }

    childrenCount() {
        return this._children.length
    }


    leftmostChild() {
        return this._children.length == 0 ? null : _.first(this._children)
    }

    rightmostChild() {
        return this._children.length == 0 ? null : _.last(this._children)
    }

    addChildFirst(node) {
        this._children.splice(0, 0, node)
        node._parent = this
        return this
    }

    addChildLast(node) {
        this._children.push(node)
        node._parent = this
        return this
    }

}

export = ArrayOrderedNode