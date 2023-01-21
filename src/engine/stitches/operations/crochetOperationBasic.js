import CrochetOperation from './crochetOperation.js'
import Vec2d from '../../misc/vector.js'

class CrochetOperationBasic extends CrochetOperation {
  get commandName () { return 'mk' }
  get minParams () { return 2 }

  static CALC_DEF_NEW_POS (fromNode, len, toNode, lastNeedleNode) {
    // figure out where we are at
    const startVector = fromNode.getVector()
    const neighborNodes = fromNode
      .getNeighborNodes() // default: excludes fromNode
      .filter(e => e.id !== toNode.id) // also exclude toNode
    // additional conditions
    const goTowardsNeedle = //  are we doing an external link?
      lastNeedleNode !== undefined &&
      fromNode.isLoopable &&
      fromNode.context.id !== toNode.context.id
    const neighborNumber = neighborNodes.length

    let delta
    const DEFAULT_TURN = Math.PI / 10

    // external link
    if (goTowardsNeedle) {
      delta = lastNeedleNode.getVector().sub(startVector)
    // no neighbors
    } else if (neighborNumber === 0) {
      delta = (startVector.len < 0.01)
        ? new Vec2d(-1, 0) // go left
        : startVector.rot(DEFAULT_TURN) // go away from center, but turn slightly
    // only one neighbor
    } else if (neighborNumber === 1) {
      delta = startVector
        .sub(neighborNodes[0].getVector()) // continue...
        .rot(DEFAULT_TURN) // ...but turn slightly
    // many neighbors, perhaps some of them "sequences"
    } else {
      const neighborSeqNodes = fromNode
        .getNeighborLinks('', 'sequence')
        .map(e => e.getOtherEnd(fromNode))
        .filter(e => e.id !== toNode.id)
      const neighborVecs = neighborNodes
        .concat(neighborSeqNodes) // note: some nodes will be doubled.
        // this is intended: sequence-linked nodes should weight more
        .map(
          e => startVector
            .sub(e.getVector())
            .unit()
        )
      delta = Vec2d.SUM(neighborVecs).scale(1 / neighborVecs.length)
    }

    // fix corner cases
    if (delta.len === 0) {
      delta = (startVector.len < 0.01)
        ? new Vec2d(-1, 0)
        : startVector.unit().rot(Math.PI / 10)
    }

    delta.len = Number(len)
    return startVector.add(delta)
  }

  exec (subject) {
    const [newLinkType, newNodeType, newLinkLength = false, drawPathName = ''] = this.params
    const newSubject = subject.copy()
    const sourceNode = newSubject.needleStack.pop() // get the node to work on
    const activeNode = newSubject.needleStack[0] // and see what's left next
    const newNode = CrochetOperation.nodeFactory.getNewObject(newNodeType, subject.contextStitch, sourceNode.getVector())
    const newLink = CrochetOperation.linkFactory.getNewObject(newLinkType, subject.contextStitch, sourceNode, newNode)

    const linkLength = (newLinkLength !== false)
      ? newLinkLength
      : newLink.defLen

    const newPos = CrochetOperationBasic.CALC_DEF_NEW_POS(sourceNode, linkLength, newNode, activeNode)
    newNode.setVector(newPos)

    if (newLinkLength !== false) newLink.setLen(Number(newLinkLength))
    if (newLink.isPrintable && drawPathName !== '') newLink.selectNewPath(drawPathName)

    newSubject.needleStack.push(newNode)
    return this.getBasicResult(newSubject, newNode, newLink)
  }
}

export default CrochetOperationBasic
