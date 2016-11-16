abstract class List {
    protected _compare

    abstract removeAt(index:number)

    abstract each(fn:(value, index)=>boolean)

    abstract count():number

    removeFirst() {
        return this.removeAt(0)
    }

    removeLast() {
        return this.removeAt(this.count() - 1)
    }

    /** If it is exists, return the index, or return -1 */
    indexOf(value) {
        let index = -1
        this.each((v, i) => {
            if (this._compare(value, v)) {
                index = i
                return true
            }
        })
        return index
    }
}

export = List
