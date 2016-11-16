import SetBase = require('./set-base')

const defaultCompare = function (x, y) {
    return x === y
}


class Set extends SetBase {
    private _compare

    /** Create a set by a array of elements */
    static fromArray(elements, compare?) {
        let s = new Set(compare)
        for (var i in elements) {
            s.add(elements[i])
        }
        return s
    }


    /** The math structure of Set */
    constructor(compare = defaultCompare) {
        super()
        this._compare = compare
    }



    /** Check if `element` is exist */
    has(element) {
        for (var i in this._elements) {
            if (this._compare(element, this._elements[i])) {
                return true
            }
        }
        return false
    }


    /** Add element */
    add(element) {
        for (var i in this._elements) {
            if (this._compare(this._elements[i], element)) {
                return false
            }
        }
        this._elements.push(element)
        return true
    }


    /** Remove the element from the set, return true if exist otherwise return false */
    remove(element) {
        for (let i = 0; i < this._elements.length; i++) {
            if (this._compare(element, this._elements[i])) {
                this._elements.splice(i, 1)
                return true
            }
        }
        return false
    }
}

export = Set
