import fullPermutation from '../alg/fullPermutation'
import GraphNode from './graphNode'
import assert from '../util/assert'

/** Base class of Graph */
export default abstract class Graph<N extends GraphNode<E>, E> {
    protected _GraphNode


    /** Add a node and return it, create a node if not provided */
    abstract addNode(node: N): N


    /** Add edge */
    addEdge(from: N, to: N, edge: E): void {
        from.addOutEdge(to, edge)
    }


    /** Remove node, if exist return true, else return false */
    abstract removeNode(n: N): boolean


    /** Remove edges */
    removeEdges(test: (from: N, to: N, edge: E) => boolean): [N, N, E][] {
        let ret = []
        this.eachNode(from => {
            from.removeOutEdges((to2, edge2) => {
                return test(from, to2, edge2)
            }).forEach((to, edge) => {
                ret.push([from, to, edge])
            })
        })
        return ret
    }


    /** Count of all nodes in the Graph */
    abstract nodeCount(): number


    /** Count edges */
    edgeCount() {
        return this.edges().length
    }


    /** Whether a node exist */
    abstract hasNode(n: N): boolean


    /** Find edges that match test */
    findEdges(test: (from: N, to: N, edge: E) => boolean): Array<[N, N, E]> {
        let edgeInfos = []
        this.eachNode(from => {
            from.eachOutEdge((to, edge) => {
                if (test(from, to, edge)) {
                    edgeInfos.push([from, to, edge])
                }
            })
        })
        return edgeInfos
    }


    /** Find the edge */
    findEdge(test: (from: N, to: N, edge: E) => boolean): [N, N, E] {
        let edgeInfo = null
        this.eachNode(from => {
            from.eachOutEdge((to, edge) => {
                if (test(from, to, edge)) {
                    edgeInfo = [from, to, edge]
                    return true
                }
            })
        })
        return edgeInfo
    }


    /** Iterate over all nodes */
    abstract eachNode(iterate: (n: N) => void | boolean): boolean


    /** Iterate over all edges */
    eachEdge(iterate: (from: N, to: N, edge: E) => void | boolean): boolean {
        return this.eachNode(from => {
            return from.eachOutEdge((to, e) => {
                if (iterate(from, to, e)) {
                    return true
                }
            })
        })
    }


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


    toJSON() {
        let nodes = new Map
        let nodeIndex = 0
        this.eachNode((node) => {
            nodes.set(node, nodeIndex++)
        })

        let transitions = []
        let fromIndex = 0
        this.eachNode((from) => {
            let transition = transitions[fromIndex++] = []
            from.eachOutEdge((to, edge) => {
                transition.push([nodes.get(to), edge])
            })
        })
        return transitions
    }
}
