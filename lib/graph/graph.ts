import fullPermutation from './fullPermutation'

/** Base class of Graph */
export default abstract class Graph {
    toJSON() {
        var me          = this
        var transitions = {}
        this.eachNode(function (from) {
            var transition = transitions[from] = []
            me.eachEdge(function (from, to, edge) {
                transition.push(edge, to)
            }, from)
        })
        return transitions
    }

    nodes() {
        var nodes = []
        this.eachNode(function (node) {
            nodes.push(node)
        })
        return nodes
    }

    edges() {
        var edges = []
        this.eachEdge(function (from, to, value) {
            edges.push([from, to, value])
        })
        return edges
    }

    // if two graphs is isostructural
    isostructural(graph) {
        if (this.edgeCount() != graph.edgeCount()
            || this.nodeCount() != graph.nodeCount()) {
            return false
        }


        var change = new Array(this.nodeCount())
        for (var i = 0; i < change.length; i++) {
            change[i] = i
        }

        var same = fullPermutation(change, (change) => {
            // map state to state
            var thisNodes  = this.nodes()
            var otherNodes = graph.nodes()
            var stateMap   = {}
            for (var i in change) {
                var j                  = change[i]
                stateMap[thisNodes[i]] = otherNodes[j]
            }

            if (this._compare(graph, stateMap)) {
                return true
            }
        })

        return same || false
    }

    abstract edgeCount(from?, to?, edge?)

    abstract nodeCount()

    abstract eachEdge(operation, from?)

    abstract eachNode(operation)

    abstract _compare(graph, stateMap)

    static parseTo(transitions, graph) {
        for (var from in transitions) {
            var transition = transitions[from]
            graph.addNode(from)
            for (var i = 0; i < transition.length; i += 2) {
                graph.addEdge(from, transition[i + 1], transition[i])
            }
        }
    }
}
