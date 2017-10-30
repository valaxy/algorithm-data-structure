import LinkedNode from './linkedNode'

/** Linked structure aiming at process linked node */
export default class Linked<T extends LinkedNode> {
    private _head = null
    private _tail = null
    private _count = 0

    get head(): T { return this._head }

    get tail(): T { return this._tail }

    get count(): number { return this._count }

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
            current = current.next
        }

        return false
    }

    insertAfter(node: T): T {
        let next = node.next
        let insertNode = node.construct()
        node.addNext(insertNode)
        if (node == this._tail) {
            this._tail = insertNode
        }
        this._count++
        return insertNode
    }

    insertBefore(node: T): T {
        let prev = node.prev
        let insertNode = node.construct()
        node.addPrev(insertNode)
        if (node == this._head) {
            this._head = insertNode
        }
        this._count++
        return insertNode
    }

    addLast(): T {
        if (this.tail) {
            return this.insertAfter(this.tail)
        } else {
            let node = new LinkedNode() as T
            this._head = this._tail = node
            this._count++
            return node
        }
    }


    addFirst(): T {
        if (this.head) {
            return this.insertBefore(this.head)
        } else {
            let node = new LinkedNode() as T
            this._head = this._tail = node
            this._count++
            return node
        }
    }


    remove(node: T) {
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

    removeMany(nodes: T[]) {
        nodes.forEach(node => {
            this.remove(node)
        })
    }
}
