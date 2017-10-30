
/** Abstract base class of Graph Node */
export default abstract class GraphNode<N extends GraphNode<N, E>, E> {
    /** Add a edge */
    abstract addOutEdge(to: N, edge: E): void


    /** Remove edges if test return true */
    abstract removeOutEdges(test: (to: N, edge: E) => boolean): void


    /** Find all out edges which test return true */
    findOutEdges(test: (to: N, edge: E) => boolean): Array<[N, E]> {
        let edgeInfos = []
        this.eachOutEdge((to, edge) => {
            if (test(to, edge)) {
                edgeInfos.push([to, edge])
            }
        })
        return edgeInfos
    }


    /** Find the first out edge which test return true */
    findOutEdge(test: (to: N, edge: E) => boolean): [N, E] {
        let edgeInfo = null
        this.eachOutEdge((to, edge) => {
            if (test(to, edge)) {
                edgeInfo = [to, edge]
                return true
            }
        })
        return edgeInfo
    }


    /** Iterate over out edges */
    abstract eachOutEdge(iterate: (to: N, edge: E) => void | boolean): boolean
}
