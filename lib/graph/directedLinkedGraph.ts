import BaseGraph from './graph'
import Linked from '../linked/linked'
import LinkedNode from '../linked/linkedNode'
import _ = require('underscore')

interface GraphNode extends LinkedNode<GraphNode> {
    value: {
        to: any
        edge: any
    }
}

export default class DirectedLinkedGraph extends BaseGraph {
    private _nodeLists: { [name: string]: Linked<GraphNode>} = {}

    static fromJSON(transitions) {
        let graph = new DirectedLinkedGraph
        BaseGraph.parseTo(transitions, graph)
        return graph
    }

    _edgeMatch(toExpected, edgeExpected, linkedNode) {
        return (toExpected === undefined || linkedNode.value.to == toExpected)
            && (edgeExpected === undefined || linkedNode.value.edge == edgeExpected)
    }

    hasNode(node) {
        return node in this._nodeLists
    }

    nodes() {
        return Object.keys(this._nodeLists)
    }

    nodeCount() {
        return this.nodes().length
    }


    /** from: undefined means any
     ** to:   undefined means any
     ** edge: undefined means any
     */
    edgeCount(from?, to?, edge?) {
        let count = 0
        if (from == undefined) {
            _.each(this._nodeLists, (nodeLink)=> {
                nodeLink.each((linkedNode) => {
                    if (this._edgeMatch(to, edge, linkedNode)) {
                        count++
                    }
                })
            })
        } else { // from != undefined
            let fromLink = this._nodeLists[from]
            fromLink.each((linkedNode) => {
                if (this._edgeMatch(to, edge, linkedNode)) {
                    count++
                }
            })
        }
        return count
    }

    /** from: undefined means any
     ** to:   undefined means any
     ** edge: undefined means any
     ** return: the edge or null
     */
    hasEdge(from, to, edge) {
        let result = null
        if (from == undefined) {
            _.each(this._nodeLists, (nodeLink)=> {
                return nodeLink.each((linkedNode)=> {
                    if (this._edgeMatch(to, edge, linkedNode)) {
                        result = linkedNode
                        return true
                    }
                })
            })
        } else { // from != undefined
            let fromLink = this._nodeLists[from]
            fromLink.each((linkedNode) => {
                if (this._edgeMatch(to, edge, linkedNode)) {
                    result = linkedNode
                    return true
                }
            })
        }
        return result
    }

    eachNode(operation) {
        for (let node in this._nodeLists) {
            if (operation(node)) {
                return true
            }
        }
        return false
    }

    eachEdge(operation, from?) {
        let me = this
        if (from != undefined) { // iterate edges of `from` node
            return this._nodeLists[from].each(function (linkedNode) {
                if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
                    return true
                }
            })
        } else { // iterate all edges
            return this.eachNode(function (from) {
                let nodeList = me._nodeLists[from]
                return nodeList.each(function (linkedNode) {
                    if (operation(from, linkedNode.value.to, linkedNode.value.edge)) {
                        return true
                    }
                })
            })
        }
    }


    addNode(nodeId) {
        if (!(nodeId in this._nodeLists)) {
            this._nodeLists[nodeId] = new Linked
        }
    }

    addEdge(from, to, edge) {
        this.addNode(from)
        this.addNode(to)
        let node = this._nodeLists[from].addLast()
        node.value = {
            to  : to,
            edge: edge
        }
    }


    removeNode(nodeId) {
        if (!(nodeId in this._nodeLists)) {
            return false
        }

        // remove edge whose to is nodeId
        this._nodeLists[nodeId].each((linkedNode) => {
            if (linkedNode.value.to != nodeId) { // loop relation will delete by next sentence
                this.removeEdge(linkedNode.value.to, nodeId)
            }
        })

        delete this._nodeLists[nodeId]

        return true
    }


    /**
     ** return: true if at least one edge be removed
     */
    removeEdge(from, to, edge?) {
        let nodes = []
        if (from === undefined) {
            this.eachNode(function (node) {
                nodes.push(node)
            })
        } else {
            nodes.push(from)
        }

        // mark and then delete
        let result = false
        nodes.forEach((fromNode) => {
            let linked = this._nodeLists[fromNode]
            if (linked) {
                let needDeletes = []
                linked.each((linkedNode) => {
                    if (this._edgeMatch(to, edge, linkedNode)) { // todo, 遍历过程中不能删除元素
                        needDeletes.push(linkedNode)
                        result = true
                    }
                })
                linked.removeMany(needDeletes)
            }
        })

        return result
    }


    // same then return true
    _compare(graph, stateMap) {
        let me = this
        return !this.eachEdge(function (from, to, edge) {
                let otherFrom = stateMap[from]
                let otherTo   = stateMap[to]
                let count     = me.edgeCount(from, to, edge)
                if (count != graph.edgeCount(otherFrom, otherTo, edge)) {
                    return true // break
                }
            }
        )
    }

    changeNodes(nodeMap) {
        // change `from` nodes
        let me           = this
        let newNodeLists = {}
        this.eachNode(function (node) {
            if (node in nodeMap) {
                newNodeLists[nodeMap[node]] = me._nodeLists[node]
            } else {
                newNodeLists[node] = me._nodeLists[node]
            }
        })
        this._nodeLists = newNodeLists

        // change `to` nodes
        this.eachNode(function (from) {
            me._nodeLists[from].each(function (linkedNode) {
                if (linkedNode.value.to in nodeMap) {
                    linkedNode.value.to = nodeMap[linkedNode.value.to]
                }
            })
        })
    }
}
