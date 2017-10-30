import Graph from '../graph'
import DirectedTransitionGraphNode from './graphNode'
import assert from '../../util/assert'


/**
 * node is identified by a string
 * edge has value which is a string
 * any two nodes can only has one same value edge
 * directed graph
 */
export default class DirectedTransitionGraph<N extends DirectedTransitionGraphNode<E>, E> extends Graph<N, E> {
    private _nodes: Set<N> = new Set

    addNode(node: N) {
        assert(!this._nodes.has(node), 'node should not exist in graph')
        this._nodes.add(node)
        return node
    }

    removeNode(node: N) {
        return this._nodes.delete(node)
    }

    nodeCount() {
        return this._nodes.size
    }

    hasNode(node) {
        return this._nodes.has(node)
    }

    eachNode(iterate) {
        for (let node of this._nodes) {
            if (iterate(node)) {
                return true
            }
        }
        return false
    }





    // transfer(from, edge) {
    //     if (from in this._nodes && this._nodes[from][edge]) {
    //         return this._nodes[from][edge]
    //     }
    //     return null
    // }

    //
    // changeNodes(nodeMap) {
    //     // change `from` nodes
    //     let newTransitions = {}
    //     this.eachNode((node) => {
    //         if (node in nodeMap) {
    //             newTransitions[nodeMap[node]] = this._nodes[node]
    //         } else {
    //             newTransitions[node] = this._nodes[node]
    //         }
    //     })
    //     this._nodes = newTransitions
    //
    //     // change `to` nodes
    //     this.eachNode((from) => {
    //         let transition = this._nodes[from]
    //         for (let edge in transition) {
    //             let to = transition[edge]
    //             if (to in nodeMap) {
    //                 transition[edge] = nodeMap[to]
    //             }
    //         }
    //     })
    // }
    //
    //
    // // same then return true
    // _compare(graph, stateMap) {
    //     return !this.eachEdge(function (from, to, edge) {
    //             let otherFrom = stateMap[from]
    //             let otherTo   = stateMap[to]
    //             if (!graph.hasEdge(otherFrom, otherTo, edge)) {
    //                 return true // break
    //             }
    //         }
    //     )
    // }

    // static fromJSON(transitions) {
    //     let graph = new DirectedTransitionGraph
    //     Graph.parseTo(transitions, graph)
    //     return graph
    // }
}
