import fullPermutation from '../alg/fullPermutation'
import GraphNode from './graphNode'

/** Base class of Graph */
export default abstract class Graph<N extends GraphNode<N, E>, E> {
    /** Count of all nodes in the Graph */
    nodeCount: number


    // 不允许传入node的封闭原则很重要, 因为在内部总是使用GraphNode类实例化节点, 导致有可能没法跟外部传入的节点类型一致
    /** Add a node and return it, create a node if not provided */
    abstract addNode(): N


    /** Iterate over all nodes */
    abstract eachNode(iterate: (n: N, i: number) => void | boolean): boolean


    /** Whether a node exist */
    abstract hasNode(n: N): boolean


    /** Get all nodes as a Array */
    nodes(): N[] {
        let nodes = []
        this.eachNode(node => {
            nodes.push(node)
        })
        return nodes
    }

    /** Get all edges as a Array */
    edges(): Array<[N, N, E]> {
        let edges = []
        this.eachNode(from => {
            from.eachOutEdge((to, e) => {
                edges.push([from, to, e])
            })
        })
        return edges
    }


    /** Count edges */
    edgeCount() {
        return this.edges.length
    }


    toJSON() {
        let nodes = new Map
        this.eachNode((node, nodeIndex) => {
            nodes.set(node, nodeIndex)
        })

        let transitions = []
        this.eachNode((from, fromIndex) => {
            let transition = transitions[fromIndex] = []
            from.eachOutEdge((to, edge) => {
                transition.push([nodes.get(to), edge])
            })
        })
        return transitions
    }


    // abstract _compare(graph: Graph<N, E>, stateMap)
    //
    // /** Whether two graphs is isostructural */
    // isostructural(graph: Graph<N, E>) {
    //     if (this.edgeCount() != graph.edgeCount() || this.nodeCount != graph.nodeCount) {
    //         return false
    //     }
    //
    //
    //     let nodePerm = new Array(this.nodeCount)
    //     for (let i = 0; i < nodePerm.length; i++) {
    //         nodePerm[i] = i
    //     }
    //
    //     // if exist one permutation of two graphs is the same, then they are isostructural
    //     let same = fullPermutation(nodePerm, (nodePerm) => {
    //         // map state to state
    //         let thisNodes  = this.nodes()
    //         let otherNodes = graph.nodes()
    //         let stateMap   = {}
    //         for (let i in nodePerm) {
    //             let j                  = nodePerm[i]
    //             stateMap[thisNodes[i]] = otherNodes[j] // i -> j
    //         }
    //
    //         if (this._compare(graph, stateMap)) {
    //             return true
    //         }
    //     })
    //
    //     return same || false
    // }

    // static parseTo(transitions, graph) {
    //     for (let from in transitions) {
    //         let transition = transitions[from]
    //         graph.addNode(from)
    //         for (let i = 0; i < transition.length; i += 2) {
    //             graph.addEdge(from, transition[i + 1], transition[i])
    //         }
    //     }
    // }
}
