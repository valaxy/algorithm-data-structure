import LinkedNode from './linkedNode'

/** Linked structure aiming at process linked node */
export default class Linked<T extends LinkedNode> {
    private _head: T
    private _tail: T
    private _count: number

    constructor() {
        this._head = null
        this._tail = null
        this._count = 0
    }

    get head() { return this._head }

    get tail() { return this._tail }

    get count() { return this._count }

    each(operation: (n: T, i: number) => any) {
        if (!this.head) {
            return false
        }

        let current = this.head
        let i = 0
        while (current) {
            if (operation(current, i++)) {
                return true
            }
            current = current.next as T
        }

        return false
    }

    insertAfter(node: T): T {
        let next = node.next
        let insertNode = new LinkedNode()
        node.addNext(insertNode)
        if (node == this._tail) {
            this._tail = insertNode as T
        }
        this._count++
        return insertNode as T
    }

    insertBefore(node: T): T {
        let prev = node.prev
        let insertNode = new LinkedNode()
        node.addPrev(insertNode)
        if (node == this._head) {
            this._head = insertNode as T
        }
        this._count++
        return insertNode as T
    }

    addLast(): T {
        if (this.tail) {
            return this.insertAfter(this.tail)
        } else {
            let node = new LinkedNode()
            this._head = this._tail = node as T
            this._count++
            return node as T
        }
    }


    addFirst(): T {
        if (this.head) {
            return this.insertBefore(this.head)
        } else {
            let node = new LinkedNode()
            this._head = this._tail = node as T
            this._count++
            return node as T
        }
    }


    remove(node: T) {
        let prev = node.prev as T
        let next = node.next as T
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

    removeMany(nodes: T[]) {
        nodes.forEach(node => {
            this.remove(node)
        })
    }
}
