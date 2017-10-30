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
