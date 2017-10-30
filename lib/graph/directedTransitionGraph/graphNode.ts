import GraphNode from '../graphNode'
import DirectedTransitionGraph from './graph'


export default class DirectedTransitionGraphNode<N extends DirectedTransitionGraphNode<N, E>, E> extends GraphNode<N, E> {
    private _transition: Map<N, E> = new Map
    private _index: number

    addOutEdge(to: N, edge: E) {
        this._transition.set(to, edge)
    }

    removeOutEdges(test) {
        for (let [to, edge] of this._transition) {
            if (test(to, edge)) {
                this._transition.delete(to)
            }
        }
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
