import Graph from './graph'
import GraphNode from './graphNode'
import assert from '../util/assert'

// 基本:
// - 图类型:      有向图, 无向图
// - 点的标识类型: 自然数, 字符串
// - 边的标识类型: 自然数, 字符串
// - 是否有环
// - 任意两点之间是否允许有重复标识的边
// - 从一个点出发的边中是否允许有重复标识的边
// - 存储方式:
//      - 邻接矩阵, 适合节点数较少的情况
//      - 出边链表, 常用情况
//      - 出边入边双链表, 适合需要反向遍历, 需要快速删除的情况

export default class GraphSerializer<N extends GraphNode<E>, E> {
	// TODO matrix如果没有完整的行怎么办?
	buildByMatrix<N extends GraphNode<E>, E>(matrix: Array<Array<[number, E]>>, graph: Graph<N, E>) {
		let nodes = []
		for (let i = 0; i < matrix.length; i++) {
			nodes[i] = graph.addNode()
		}

	    for (let fromIndex = 0; fromIndex < matrix.length; fromIndex++) {
	        let row = matrix[fromIndex]
	        for (let i = 0; i < row.length; i += 2) {
				let [toIndex, edge] = row[i]
	            graph.addEdge(nodes[fromIndex], nodes[toIndex], edge)
	        }
	    }

		return graph
	}

	_makeSureNodeExist(name, nameToNode, graph) {
		if (!(name in nameToNode)) {
			return nameToNode[name] = graph.addNode()
		} else {
			return nameToNode[name]
		}
	}

	buildByObject(map: { [key: string]: Array<[E, string]>}, graph: Graph<N, E>) {
		let nameToNode = { }
		for (let fromName in map) {
			let fromNode = this._makeSureNodeExist(fromName, nameToNode, graph)
			for (let [edge, toName] of map[fromName]) {
				let toNode = this._makeSureNodeExist(toName, nameToNode, graph)
				graph.addEdge(fromNode, toNode, edge)
			}
		}

		return graph
	}
}
