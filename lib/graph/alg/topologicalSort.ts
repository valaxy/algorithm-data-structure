import Graph from '../graph'
import GraphNode from '../graphNode'


interface InnerGraphNode<E> extends GraphNode<E> {
    inDegree: number
}

const findMinimumInDegree = function<E>(g: Graph<InnerGraphNode<E>, E>): InnerGraphNode<E> {
    let find = null
    g.eachNode(node => {
        if (node.inDegree == 0) {
            find = node
            return true
        }
    })
    return find
}


// TODO O(n^2) 可优化到 O(nlogn)
export default function topologicalSort<N extends GraphNode<E>, E>(graph: Graph<N, E>): N[] {
    let g: Graph<InnerGraphNode<E>, E> = graph as any

    // TODO get a copy of graph first

    g.eachNode(node => {
        node.inDegree = 0
    })

    g.eachEdge((from, to, edge) => {
        to.inDegree += 1
    })

    let orders = []

    // must cache `g.nodeCount()` first
    for (let i=0, len=g.nodeCount(); i<len; i++) {
        let node = findMinimumInDegree(g)
        if (!node) { throw new Error('graph is not a topological grpah') }
        node.removeOutEdges((to, _) => (to.inDegree--, true))
        g.removeNode(node)
        orders.push(node)
    }

    return orders
}
