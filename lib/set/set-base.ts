import _ = require('underscore')

abstract class SetBase {
    protected _elements = []

    abstract has(element):boolean

    abstract add(element)

    abstract remove(element)

    /** Return a array of elements */
    toArray() {
        return [].concat(this._elements)
    }

    /** Return the count of elements of set */
    count() {
        return this._elements.length
    }

    /** Check if the set is empty */
    isEmpty() {
        return this.count() === 0
    }

    /** Check if has one of `elements` */
    hasOneOf(elements) {
        for (var i in elements) {
            if (this.has(elements[i])) {
                return true
            }
        }
        return false
    }

    /** Check if has all `elements` */
    hasAll(elements) {
        for (var i in elements) {
            if (!this.has(elements[i])) {
                return false
            }
        }
        return true
    }

    /** Iterate each element and invoke `operation` */
    each(operation) {
        for (var i in this._elements) {
            if (operation(this._elements[i])) {
                return true
            }
        }
        return false
    }

    /** Perform a union with `otherSet` and return this */
    union(otherSet) {
        otherSet.each((x) => {
            this.add(x)
        })
        return this
    }


    /** Perform an intersection with `otherSet` and return this */
    intersect(otherSet) {
        let needRemove = []
        this.each((x) => {
            if (!otherSet.has(x)) {
                needRemove.push(x)
            }
        })
        _.each(needRemove, (x) => {
            this.remove(x)
        })
        return this
    }


    /** Empty the set and return a array of old elements */
    clear() {
        let orignal    = this._elements
        this._elements = []
        return orignal
    }
}

export = SetBase