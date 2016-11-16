const OrderedNode = require('./ordered-node')
import _ = require('underscore')

var ArrayOrderedNode = function () {
    this._parent   = null
    this._children = []
}

OrderedNode.extend(ArrayOrderedNode)

ArrayOrderedNode.extend = function (cls) {
    var n = new ArrayOrderedNode
    delete n._parent
    delete n._children
    cls.prototype = n
}

ArrayOrderedNode.prototype.parent = function () {
    return this._parent
}

ArrayOrderedNode.prototype.childAt = function (index) {
    return this._children[index]
}

ArrayOrderedNode.prototype.eachChild = function (operation) {
    for (var i in this._children) {
        if (operation(this._children[i], i)) {
            return true
        }
    }
    return false
}

ArrayOrderedNode.prototype.childrenCount = function () {
    return this._children.length
}


ArrayOrderedNode.prototype.leftmostChild = function () {
    return this._children.length == 0 ? null : _.first(this._children)
}

ArrayOrderedNode.prototype.rightmostChild = function () {
    return this._children.length == 0 ? null : _.last(this._children)
}

ArrayOrderedNode.prototype.addChildFirst = function (node) {
    this._children.splice(0, 0, node)
    node._parent = this
    return this
}

ArrayOrderedNode.prototype.addChildLast = function (node) {
    this._children.push(node)
    node._parent = this
    return this
}

export = ArrayOrderedNode