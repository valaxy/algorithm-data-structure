import repeat = require('../base/repeat')



//value() {
//	return this._value
//}
//
//setValue(value) {
//	this._value = value
//}


abstract class OrderedNode {
    abstract leftmostChild()

    abstract rightmostChild()

    abstract childrenCount():number

    abstract eachChild(fn)

    /** Return the deepest and leftmost descendant, including itself */
    leftmostDescendant() {
        var current = this
        while (true) {
            var child = current.leftmostChild()
            if (!child) {
                return current
            } else {
                current = child
            }
        }
    }

    /** Return the deepest and rightmost descendant, including itself */
    rightmostDescendant() {
        var current = this
        while (true) {
            var child = current.rightmostChild()
            if (!child) {
                return current
            } else {
                current = child
            }
        }
    }


    /** Check if it is same structure with other tree
     * @param otherTreeRoot root of the tree
     * @returns {boolean} true or false */
    isostructural(otherTreeRoot) {
        if (this.childrenCount() != otherTreeRoot.childrenCount()) {
            return false
        }

        // this tree
        var children = []
        this.eachChild((child) => {
            children.push(child)
        })

        // other tree
        var isBreak = otherTreeRoot.eachChild((child, i) => {
            var compare = children[i].isostructural(child)
            if (!compare) {
                return true
            }
        })

        return !isBreak
    }


    // dfs to build
    _toString(deep) {
        var str = ''
        str += repeat(deep * 4) + 'node' + '\n'

        this.eachChild(function (child) {
            str += child._toString(deep + 1)
        })
        return str
    }

    /** Print a xml tree, a debug method */
    toString() {
        return this._toString(0)
    }


    postorderWalk(operation) {
        return this.eachChild(function (child) {
                if (child.postorderWalk(operation)) {
                    return true
                }
            }) || operation(this)
    }

    preorderWalk(operation) {
        return operation(this)
            || this.eachChild(function (child) {
                if (child.preorderWalk(operation)) {
                    return true
                }
            })
    }

}

export = OrderedNode