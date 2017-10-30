import GraphNode from '../graphNode'
import DirectedTransitionGraph from './graph'


export default class DirectedTransitionGraphNode<E> extends GraphNode<E> {
    private _transition: Map<this, E> = new Map
    private _index: number

    addOutEdge(to: this, edge: E) {
        this._transition.set(to, edge)
    }

    removeOutEdges(test) {
        let removed = []
        for (let [to, edge] of this._transition) {
            if (test(to, edge)) {
                this._transition.delete(to)
                removed.push([to, edge])
            }
        }
        return removed
    }

    eachOutEdge(iterate) {
        for (let [to, edge] of this._transition) {
            if (iterate(to, edge)) {
                return true
            }
        }
        return false
    }
}
