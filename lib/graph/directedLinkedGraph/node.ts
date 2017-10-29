import GraphNode from '../graphNode'
import Linked from '../../linked/linked'
import LinkedNode from '../../linked/linkedNode'

interface EdgeInfo<N, E> extends LinkedNode<EdgeInfo<N, E>> {
    to: N
    edge: E
}


export default class DirectedLinkedGraphNode<N extends DirectedLinkedGraphNode<N, E>, E> extends GraphNode<N, E> {
    private _linkedList: Linked<EdgeInfo<N, E>> = new Linked

    private _edgeMatch(toExpected: N, actualEdgeInfo: EdgeInfo<N, E>) {
        return toExpected === undefined || actualEdgeInfo.to === toExpected
    }

    outEdgeCount(to?: N) {
        let count = 0
        this._linkedList.each(edgeInfo => {
            if (this._edgeMatch(to, edgeInfo)) {
                count++
            }
        })
        return count
    }

    eachOutEdge(iterate) {
        return this._linkedList.each(edgeInfo => {
            if (iterate(edgeInfo.to, edgeInfo.edge)) {
                return true
            }
        })
    }

    addOutEdge(to: N, edge: E): void {
        let node = this._linkedList.addLast()
        node.to = to
        node.edge = edge
    }
}
