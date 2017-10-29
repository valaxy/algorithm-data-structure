
/** Abstract base class of Graph Node */
export default abstract class GraphNode<N extends GraphNode<N, E>, E> {
    /** Count the out edges of this node */
    abstract outEdgeCount(to?: N): number


    /** Iterate over out edges */
    abstract eachOutEdge(iterate: (to: N, edge: E) => void | boolean): boolean


    /** Add a edge */
    abstract addOutEdge(to: N, e: E): void
}



// /** Create a instance with the same type */
// construct(): N {
//     let Construct = this.constructor as { new(): N }
//     return new Construct()
// }
