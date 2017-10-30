
/** Abstract base class of Graph Node */
export default abstract class GraphNode<E> {
    /** Add a edge */
    abstract addOutEdge(to: this, edge: E): void


    /** Remove edges if test return true */
    abstract removeOutEdges(test: (to: this, edge: E) => boolean): Array<[this, E]>


    /** Find all out edges which test return true */
    findOutEdges(test: (to: this, edge: E) => boolean): Array<[this, E]> {
        let edgeInfos = []
        this.eachOutEdge((to, edge) => {
            if (test(to, edge)) {
                edgeInfos.push([to, edge])
            }
        })
        return edgeInfos
    }


    /** Find the first out edge which test return true */
    findOutEdge(test: (to: this, edge: E) => boolean): [this, E] {
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
    abstract eachOutEdge(iterate: (to: this, edge: E) => void | boolean): boolean
}
