var List = function () {
    // nothing
}

List.prototype.removeFirst = function () {
    return this.removeAt(0)
}

List.prototype.removeLast = function () {
    return this.removeAt(this.count() - 1)
}

/** If it is exists, return the index, or return -1 */
List.prototype.indexOf = function (value) {
    var index = -1
    var me    = this
    this.each(function (v, i) {
        if (me._compare(value, v)) {
            index = i
            return true
        }
    })
    return index
}

export = List
