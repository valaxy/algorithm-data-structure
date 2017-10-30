import GraphNode from '../graphNode'
import Linked from '../../linked/linked'
import LinkedNode from '../../linked/linkedNode'

interface EdgeInfo<N, E> extends LinkedNode<EdgeInfo<N, E>> {
    to: N
    edge: E
}


export default class DirectedLinkedGraphNode<N extends DirectedLinkedGraphNode<N, E>, E> extends GraphNode<N, E> {
    private _linkedList: Linked<EdgeInfo<N, E>> = new Linked

    addOutEdge(to: N, edge: E): void {
        let node = this._linkedList.addLast()
        node.to = to
        node.edge = edge
    }

    removeOutEdges(test: (to: N, edge: E) => boolean): void {
        let removed = []
        this._linkedList.each(edgeInfo => {
            if (test(edgeInfo.to, edgeInfo.edge)) {
                removed.push(edgeInfo)
            }
        })
        this._linkedList.removeMany(removed)
    }

    eachOutEdge(iterate: (to: N, edge: E) => void | boolean): boolean {
        return this._linkedList.each(edgeInfo => {
            if (iterate(edgeInfo.to, edgeInfo.edge)) {
                return true
            }
        })
    }
}
