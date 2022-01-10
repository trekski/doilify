import CrochetOperation from './crochetOperation.js'
import Vec2d from '../../misc/vector.js'

class CrochetOperationBasic extends CrochetOperation {
  get commandName () { return 'mk' }
  get minParams () { return 2 }

  static CALC_DEF_NEW_POS (fromNode, len, toNode, lastNeedleNode) {
    // default: point away from CoM of fromNode neighborhood
    const start = fromNode.getVector()
    let neighbors = fromNode
      .getNeighborNodes() // default: excludes fromNode
      .filter(e => e.id !== toNode.id)
    if (neighbors.length === 0) neighbors = [fromNode] // fallback
    const neighborVecs = neighbors.map(e => e.getVector())
    const avgNeighborVec = Vec2d.SUM(neighborVecs).scale(1 / neighborVecs.length)

    // additional conditions
    const goTowardsNeedle =
      lastNeedleNode !== undefined &&
      fromNode.isLoopable &&
      fromNode.context.id !== toNode.context.id
    let delta = goTowardsNeedle
      ? lastNeedleNode.getVector().sub(start)
      // ? start.sub(avgNeighborVec)
      : start.sub(avgNeighborVec)

    // fix corner cases
    if (delta.len > 0) { // CoM is not same as fromNode => go in opposite dir to it
      // only one neighbor => extend and turn
      if (neighbors.length === 1) { delta = delta.rot(Math.PI / 10) };
    } else { // CoM = fromNode => go away from (0,0) or left
      const dir = (start.len < 0.01) ? new Vec2d(-1, 0) : start.unit().rot(Math.PI / 10)
      delta = dir
    }

    delta.len = len
    return start.add(delta)
  }

  exec () {
    const [newLinkType, newNodeType, newLinkLength = false, drawPathName = ''] = this.params
    const newSubject = this.subject.copy()
    const sourceNode = newSubject.needleStack.pop() // get the node to work on
    const activeNode = newSubject.needleStack[0] // and see what's left next
    const newNode = CrochetOperation.nodeFactory.getNewObject(newNodeType, this.subject.contextStitch, sourceNode.getVector())
    const newLink = CrochetOperation.linkFactory.getNewObject(newLinkType, this.subject.contextStitch, sourceNode, newNode)

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
