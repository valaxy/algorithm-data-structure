import GraphNode from '../graphNode'
import Linked from '../../linked/linked'
import LinkedNode from '../../linked/linkedNode'

interface EdgeInfo<N, E> extends LinkedNode {
    to: N
    edge: E
}


export default class DirectedLinkedGraphNode<E> extends GraphNode<E> {
    private _linkedList: Linked<EdgeInfo<this, E>> = new Linked

    addOutEdge(to: this, edge: E): void {
        let node = this._linkedList.addLast()
        node.to = to
        node.edge = edge
    }

    removeOutEdges(test: (to: this, edge: E) => boolean): Array<[this, E]> {
        let removed: EdgeInfo<this, E>[] = []
        this._linkedList.each(edgeInfo => {
            if (test(edgeInfo.to, edgeInfo.edge)) {
                removed.push(edgeInfo)
            }
        })
        this._linkedList.removeMany(removed)
        return removed.map(({to, edge}) => [to, edge] as [this, E])
    }

    eachOutEdge(iterate: (to: this, edge: E) => void | boolean): boolean {
        return this._linkedList.each(edgeInfo => {
            if (iterate(edgeInfo.to, edgeInfo.edge)) {
                return true
            }
        })
    }
}
