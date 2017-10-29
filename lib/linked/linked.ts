import LinkedNode from './linkedNode'

/** Linked structure aiming at process linked node */
export default class Linked {
    private _head: LinkedNode
    private _tail: LinkedNode
    private _count: number

    constructor() {
        this._head = null
        this._tail = null
        this._count = 0
    }

    get head() { return this._head }

    get tail() { return this._tail }

    get count() { return this._count }

    each(operation: (n: LinkedNode, i: number) => any) {
        if (!this.head) {
            return false
        }

        let current = this.head
        let i = 0
        while (current) {
            if (operation(current, i++)) {
                return true
            }
            current = current.next
        }

        return false
    }

    insertAfter(node: LinkedNode) {
        let next = node.next
        let insertNode = new LinkedNode()
        node.addNext(insertNode)
        if (node == this._tail) {
            this._tail = insertNode
        }
        this._count++
        return insertNode
    }

    insertBefore(node: LinkedNode) {
        let prev = node.prev
        let insertNode = new LinkedNode()
        node.addPrev(insertNode)
        if (node == this._head) {
            this._head = insertNode
        }
        this._count++
        return insertNode
    }

    addLast() {
        if (this.tail) {
            return this.insertAfter(this.tail)
        } else {
            let node = new LinkedNode()
            this._head = this._tail = node
            this._count++
            return node
        }
    }


    addFirst() {
        if (this.head) {
            return this.insertBefore(this.head)
        } else {
            let node = new LinkedNode()
            this._head = this._tail = node
            this._count++
            return node
        }
    }


    remove(node: LinkedNode) {
        let prev = node.prev
        let next = node.next
        node.remove()
        if (!prev) {
            this._head = next
        }
        if (!next) {
            this._tail = prev
        }
        this._count--
        return node
    }

    removeMany(nodes: LinkedNode[]) {
        nodes.forEach(function(node) {
            this.remove(node)
        }.bind(this))
    }
}
