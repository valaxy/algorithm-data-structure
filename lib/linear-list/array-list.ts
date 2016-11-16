import _ = require('underscore')
import List = require('./list')

const defaultCompare = function (x, y) {
    return x === y
}



class ArrayList extends List {
    protected _values = []

    static fromArray(values) {
        let l     = new ArrayList
        l._values = [].concat(values)
        return l
    }

    /** Array List
     ** options:
     **     compare: a compare function, optional
     */
    constructor({compare} = {compare: defaultCompare}) {
        super()
        this._compare = compare
    }


    toArray() {
        return [].concat(this._values)
    }

    each(operation) {
        for (var i in this._values) {
            if (operation(this._values[i], i)) {
                return true
            }
        }
        return false
    }

    first() {
        return _.first(this._values)
    }

    last() {
        return _.last(this._values)
    }

    count() {
        return this._values.length
    }

    isEmpty() {
        return this.count() == 0
    }


    getAt(index) {
        return this._values[index]
    }

    setAt(index, value) {
        this._values[index] = value
        return this
    }

    addFirst(value) {
        this._values.splice(0, 0, value)
        return this
    }

    addLast(value) {
        this._values.push(value)
        return this
    }

    insertAt(index, value) {
        this._values.splice(index, 0, value)
        return this
    }

    removeAt(index) {
        this._values.splice(index, 1)
        return this
    }

    clear() {
        this._values = []
        return this
    }
}


export = ArrayList