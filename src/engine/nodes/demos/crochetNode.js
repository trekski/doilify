import CrochetNode from '../crochetNode.js'
import CrochetNodeOrigin from '../crochetNodeOrigin.js'
import CrochetNodeStart from '../crochetNodeStart.js'
import CrochetNodeFinish from '../crochetNodeFinish.js'
import CrochetNodeLoop from '../crochetNodeLoop.js'
import CrochetNodeHook from '../crochetNodeHook.js'
import CrochetNodeStruct from '../crochetNodeStruct.js'
import CrochetNodeCHSpaceStart from '../crochetNodeCHSpaceStart.js'
import CrochetNodeCHSpaceCont from '../crochetNodeCHSpaceCont.js'

function crocehtNodeDemo (log) {
  let n = new CrochetNode('A', [1, 2])
  log(`${n} : type ${n.getType()}`)

  n = new CrochetNode('B', [2, 3])
  log(`${n} : array ${n.getArray()} `)

  n = new CrochetNodeOrigin('X', [9, 9])
  log(`${n} : vector  ${n.getVector()} `)

  n = new CrochetNodeStart('Y', [9, 9])
  log(`${n} : neighbor count ${n.getNeighborCount()} `)

  n = new CrochetNodeFinish('Y', [9, 9])
  const n2 = new CrochetNode('A', [1, 2])
  const n3 = new CrochetNode('A', [1, 2])

  let l1 = { source: n, target: n2 }
  const l2 = { source: n, target: n3 }
  n.registerNeighbor(l1).registerNeighbor(l2)
  n2.registerNeighbor(l1)
  n3.registerNeighbor(l2)
  log(`${n} : neighbors ${n.getNeighborNodes()} `)
  log(`${n2} : neighbors ${n2.getNeighborNodes()} `)
  log(`${n3} : neighbors ${n3.getNeighborNodes()} `)

  n = new CrochetNodeHook('Y', [9, 9])
  l1 = { source: n, target: n2, getType: () => 'x' }
  n.registerNeighbor(l1)
  log(`${n} : links ${n.getNeighborLinks()[0].source.getVector()} `)

  n = new CrochetNodeLoop('Y', [9, 9])
  log(`${n} : loopable ${n.isLoopable()} `)

  n = new CrochetNodeStruct('Y', [9, 9])
  log(`${n} : string ${n.toString()} `)

  n = new CrochetNodeCHSpaceStart('Y', [9, 9])
  log(`${n} : string ${n.getColor()} `)

  n = new CrochetNodeCHSpaceCont('Y', [9, 9])
  log(`${n} : string ${n.getDesc()} `)
}

export default crocehtNodeDemo
