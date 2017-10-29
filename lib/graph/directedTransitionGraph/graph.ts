import Graph from '../graph'

/**
 * node is identified by a string
 * edge has value which is a string
 * any two nodes can only has one same value edge
 * directed graph
 */
export default class DirectedTransitionGraph extends Graph {
    private _transitions = {}


    static fromJSON(transitions) {
        let graph = new DirectedTransitionGraph
        Graph.parseTo(transitions, graph)
        return graph
    }


    nodeCount() {
        return this.nodes().length
    }

    edgeCount() {
        let count = 0
        for (let node in this._transitions) {
            count += Object.keys(this._transitions[node]).length
        }
        return count
    }

    eachNode(operation) {
        for (let node in this._transitions) {
            if (operation(node)) {
                return true
            }
        }
        return false
    }

    eachEdge(operation, from?) {
        if (from == undefined) {
            for (let node in this._transitions) {
                for (let edge in this._transitions[node]) {
                    if (operation(node, this._transitions[node][edge], edge)) {
                        return true
                    }
                }
            }
        } else {
            let transition = this._transitions[from]
            for (let edge in transition) {
                if (operation(from, transition[edge], edge)) {
                    return true
                }
            }
        }
        return false
    }

    hasNode(node) {
        return node in this._transitions
    }

    hasEdge(from, to, edge) {
        return from in this._transitions && to == this._transitions[from][edge]
    }


    addNode(node) {
        if (!(node in this._transitions)) {
            this._transitions[node] = {}
        }
        return this
    }

    addEdge(from, to, edge) {
        this.addNode(from)
        this.addNode(to)
        this._transitions[from][edge] = to
    }

    removeNode(node) {
        if (!(node in this._transitions)) {
            return false
        }

        for (let edge in this._transitions[node]) {
            return false
        }

        delete this._transitions[node]

        return true
    }

    removeEdge(from, to, edge) {
        if (this.hasEdge(from, to, edge)) {
            delete this._transitions[from][edge]
            return true
        }
        return false
    }

    transfer(from, edge) {
        if (from in this._transitions && this._transitions[from][edge]) {
            return this._transitions[from][edge]
        }
        return null
    }


    changeNodes(nodeMap) {
        // change `from` nodes
        let newTransitions = {}
        this.eachNode((node) => {
            if (node in nodeMap) {
                newTransitions[nodeMap[node]] = this._transitions[node]
            } else {
                newTransitions[node] = this._transitions[node]
            }
        })
        this._transitions = newTransitions

        // change `to` nodes
        this.eachNode((from) => {
            let transition = this._transitions[from]
            for (let edge in transition) {
                let to = transition[edge]
                if (to in nodeMap) {
                    transition[edge] = nodeMap[to]
                }
            }
        })
    }


    // same then return true
    _compare(graph, stateMap) {
        return !this.eachEdge(function (from, to, edge) {
                let otherFrom = stateMap[from]
                let otherTo   = stateMap[to]
                if (!graph.hasEdge(otherFrom, otherTo, edge)) {
                    return true // break
                }
            }
        )
    }
}
