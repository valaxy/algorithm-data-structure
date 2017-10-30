import Graph from '../graph'
import DirectedLinkedGraphNode from './graphNode'
import Linked from '../../linked/linked'
import LinkedNode from '../../linked/linkedNode'
import _ = require('underscore')


interface EdgeInfo<N, E> extends LinkedNode<EdgeInfo<N, E>> {
    to: N
    edge: E
}


export default class DirectedLinkedGraph<N extends DirectedLinkedGraphNode<N, E>, E> extends Graph<N, E> {
    private _nodes: Set<N> = new Set

    addNode(): N {
        let n = new DirectedLinkedGraphNode as N
        this._nodes.add(n)
        return n
    }

    removeNode(node: N) {
        node.removeOutEdges(() => true)
        this.eachNode(from => {
            from.removeOutEdges(to => to === node)
        })
        return this._nodes.delete(node)
    }

    nodeCount() {
        return this._nodes.size
    }

    hasNode(node: N) {
        return this._nodes.has(node)
    }

    eachNode(iterate: (n: N) => void | boolean): boolean {
        for (let node of this._nodes) {
            if (iterate(node)) {
                return true
            }
        }
        return false
    }

    // /**
    //  ** return: true if at least one edge be removed
    //  */
    // removeEdge(from, to, edge?) {
    //     let nodes = []
    //     if (from === undefined) {
    //         this.eachNode(function (node) {
    //             nodes.push(node)
    //         })
    //     } else {
    //         nodes.push(from)
    //     }
    //
    //     // mark and then delete
    //     let result = false
    //     nodes.forEach((fromNode) => {
    //         let linked = this._nodeLinkedList[fromNode]
    //         if (linked) {
    //             let needDeletes = []
    //             linked.each((linkedNode) => {
    //                 if (this._edgeMatch(to, edge, linkedNode)) { // todo, 遍历过程中不能删除元素
    //                     needDeletes.push(linkedNode)
    //                     result = true
    //                 }
    //             })
    //             linked.removeMany(needDeletes)
    //         }
    //     })
    //
    //     return result
    // }
    //

    // // same then return true
    // _compare(graph, stateMap) {
    //     return !this.eachEdge((from, to, edge) => {
    //         let otherFrom = stateMap[from]
    //         let otherTo   = stateMap[to]
    //         let count     = this.edgeCount(from, to, edge)
    //         if (count != graph.edgeCount(otherFrom, otherTo, edge)) {
    //             return true // break
    //         }
    //     })
    // }
    //
    // changeNodes(nodeMap) {
    //     // change `from` nodes
    //     let me           = this
    //     let newNodeLists = {}
    //     this.eachNode(function (node) {
    //         if (node in nodeMap) {
    //             newNodeLists[nodeMap[node]] = me._nodeLinkedList[node]
    //         } else {
    //             newNodeLists[node] = me._nodeLinkedList[node]
    //         }
    //     })
    //     this._nodeLinkedList = newNodeLists
    //
    //     // change `to` nodes
    //     this.eachNode(function (from) {
    //         me._nodeLinkedList[from].each(function (linkedNode) {
    //             if (linkedNode.value.to in nodeMap) {
    //                 linkedNode.value.to = nodeMap[linkedNode.value.to]
    //             }
    //         })
    //     })
    // }
}
