import Graph from '../graph'
import GraphNode from './node'
import Linked from '../../linked/linked'
import LinkedNode from '../../linked/linkedNode'
import _ = require('underscore')


interface EdgeInfo<N, E> extends LinkedNode<EdgeInfo<N, E>> {
    to: N
    edge: E
}


export default class DirectedLinkedGraph<N extends GraphNode<N, E>, E> extends Graph<N, E> {
    private _nodeLinkedList: Set<N> = new Set

    get nodeCount(): number {
        return this._nodeLinkedList.size
    }

    addNode(): N {
        let n = new GraphNode as N
        this._nodeLinkedList.add(n)
        return n
    }


    eachNode(iterate): boolean {
        let i = 0
        for (let node of this._nodeLinkedList) {
            if (iterate(node, i++)) {
                return true
            }
        }
        return false
    }

    hasNode(node) {
        return this._nodeLinkedList.has(node)
    }


    // static fromJSON(transitions) {
    //     let graph = new DirectedLinkedGraph
    //     Graph.parseTo(transitions, graph)
    //     return graph
    // }






    // /** from: undefined means any
    //  ** to:   undefined means any
    //  ** edge: undefined means any
    //  ** return: the edge or null
    //  */
    // hasEdge(from, to, edge) {
    //     let result = null
    //     if (from == undefined) {
    //         _.each(this._nodeLinkedList, (nodeLink)=> {
    //             return nodeLink.each((linkedNode)=> {
    //                 if (this._edgeMatch(to, edge, linkedNode)) {
    //                     result = linkedNode
    //                     return true
    //                 }
    //             })
    //         })
    //     } else { // from != undefined
    //         let fromLink = this._nodeLinkedList[from]
    //         fromLink.each((linkedNode) => {
    //             if (this._edgeMatch(to, edge, linkedNode)) {
    //                 result = linkedNode
    //                 return true
    //             }
    //         })
    //     }
    //     return result
    // }
    //
    //
    //
    // eachEdge(operation, from?) {
    //     if (from != undefined) { // iterate edges of `from` node
    //         return this._nodeLinkedList[from].each((linkedNode) => {
    //             if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
    //                 return true
    //             }
    //         })
    //     } else { // iterate all edges
    //         return this.eachNode((from) => {
    //             let nodeList = this._nodeLinkedList[from]
    //             return nodeList.each(function (linkedNode) {
    //                 if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
    //                     return true
    //                 }
    //             })
    //         })
    //     }
    // }
    //
    //
    //
    //
    //
    //
    // removeNode(nodeId) {
    //     if (!(nodeId in this._nodeLinkedList)) {
    //         return false
    //     }
    //
    //     // remove edge whose to is nodeId
    //     this._nodeLinkedList[nodeId].each((linkedNode) => {
    //         if (linkedNode.value.to != nodeId) { // loop relation will delete by next sentence
    //             this.removeEdge(linkedNode.value.to, nodeId)
    //         }
    //     })
    //
    //     delete this._nodeLinkedList[nodeId]
    //
    //     return true
    // }
    //
    //
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


// nodes() {
//     return Object.keys(this._nodeLinkedList)
// }
