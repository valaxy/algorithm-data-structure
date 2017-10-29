export default class LinkedNode {
    private _prev: LinkedNode
    private _next: LinkedNode

    constructor() {
        this._prev = null
        this._next = null
    }

    /** Get next node or null */
    get next() { return this._next }


    /** Get prev node or null */
    get prev() { return this._prev }


    /** Make `node` to be the next node */
    addNext(node: LinkedNode) {
        let next   = this.next
        this._next = node
        node._prev = this
        if (next) {
            node._next = next
            next._prev = node
        }
    }

    /** Make `node` to be the prev node */
    addPrev(node: LinkedNode) {
        let prev   = this.prev
        node._next = this
        this._prev = node
        if (prev) {
            node._prev = prev
            prev._next = node
        }
    }

    /** Cut the relation with prev and next if relations exist */
    remove() {
        let prev   = this.prev
        let next   = this.next
        this._prev = this._next = null
        if (prev) {
            prev._next = next
        }
        if (next) {
            next._prev = prev
        }
    }
}
