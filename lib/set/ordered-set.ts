import SetBase = require('./set-base')



class OrderedSet extends SetBase {
    protected _compare

    static fromArray(elements, compare) {
        var s = new OrderedSet(compare)
        for (var i in elements) {
            s.add(elements[i])
        }
        return s
    }

    constructor(compare) {
        super()
        this._compare = compare
    }


    index(element) {
        for (var i = 0; i < this._elements.length; i++) {
            if (this._compare(element, this._elements[i]) == 0) {
                return i
            }
        }
        return -1
    }

    has(element) {
        return this.index(element) >= 0
    }

    add(element) {
        for (var i = 0; i < this._elements.length; i++) {
            if (this._compare(element, this._elements[i]) <= 0) {
                break
            }
        }

        if (i < this._elements.length && this._compare(element, this._elements[i]) == 0) {
            return false
        }
        this._elements.splice(i, 0, element)
        return true
    }

    remove(element) {
        for (let i = 0; i < this._elements.length; i++) {
            if (this._compare(element, this._elements[i]) == 0) {
                this._elements.splice(i, 1)
                return true
            }
        }
        return false
    }

    removeAt(i) {
        this._elements.splice(i, 1)
    }
}

export = OrderedSet