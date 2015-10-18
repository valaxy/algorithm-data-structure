var fullPermutation = require('./full-permutation')


/** Base class of Graph */
var Graph = function () {
    // nothing
}

Graph.parseTo = function (transitions, graph) {
    for (var from in transitions) {
        var transition = transitions[from]
        graph.addNode(from)
        for (var i = 0; i < transition.length; i += 2) {
            graph.addEdge(from, transition[i + 1], transition[i])
        }
    }
}

Graph.prototype.toJSON = function () {
    var me = this
    var transitions = {}
    this.eachNode(function (from) {
        var transition = transitions[from] = []
        me.eachEdge(function (from, to, edge) {
            transition.push(edge, to)
        }, from)
    })
    return transitions
}

Graph.prototype.nodes = function () {
    var nodes = []
    this.eachNode(function (node) {
        nodes.push(node)
    })
    return nodes
}

Graph.prototype.edges = function () {
    var edges = []
    this.eachEdge(function (from, to, value) {
        edges.push([from, to, value])
    })
    return edges
}

// if two graphs is isostructural
Graph.prototype.isostructural = function (graph) {
    if (this.edgeCount() != graph.edgeCount()
        || this.nodeCount() != graph.nodeCount()) {
        return false
    }

    var me = this

    var change = new Array(this.nodeCount())
    for (var i = 0; i < change.length; i++) {
        change[i] = i
    }

    var same = fullPermutation(change, function (change) {
        // map state to state
        var thisNodes = me.nodes()
        var otherNodes = graph.nodes()
        var stateMap = {}
        for (var i in change) {
            var j = change[i]
            stateMap[thisNodes[i]] = otherNodes[j]
        }

        if (me._compare(graph, stateMap)) {
            return true
        }
    })

    return same || false
}

module.exports = Graph