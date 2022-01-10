import CrochetOperation from './crochetOperation.js'
import Vec2d from '../../misc/vector.js'

class CrochetOperationBasic extends CrochetOperation {
  get commandName () { return 'mk' }
  get minParams () { return 2 }

  static CALC_DEF_NEW_POS (fromNode, len, toNode) {
    // default: point away from Com of fromNode neighborhood
    const start = fromNode.getVector()
    let neighbors = fromNode.getNeighborNodes() // excludes fromNode
    if (neighbors.length === 1) neighbors = [fromNode] // fallback
    const neighborVecs = neighbors.map(e => e.getVector())
    const avgNeighborVec = Vec2d.SUM(neighborVecs).scale(1 / neighborVecs.length)
    let delta = start.sub(avgNeighborVec)

    // fix corner cases
    if (delta.len() > 0) { // CoM is not same as fromNode => go in opposite dir to it
      delta.len(len)
      // only one neighbor => extend and turn
      if (neighbors.length === 1) { delta = delta.rot(Math.PI / 10) };
    } else { // CoM = fromNode => go away from (0,0) or left
      const dir = (start.len() < 0.01) ? new Vec2d(-1, 0) : start.unit().rot(Math.PI / 10)
      delta = dir.len(len)
    }
    
    return start.add(delta)
  }

  exec () {
    const [newLinkType, newNodeType, newLinkLength = false, drawPathName = ''] = this.params
    const newSubject = this.subject.copy()
    const sourceNode = newSubject.needleStack.pop()
    const newNode = CrochetOperation.nodeFactory.getNewObject(newNodeType, this.subject.contextStitch, sourceNode.getVector())
    const newLink = CrochetOperation.linkFactory.getNewObject(newLinkType, this.subject.contextStitch, sourceNode, newNode)

    const linkLength = (newLinkLength !== false)
      ? newLinkLength
      : newLink.defLen

    const newPos = CrochetOperationBasic.CALC_DEF_NEW_POS(sourceNode, linkLength, newNode)
    newNode.setVector(newPos)

    if (newLinkLength !== false) newLink.setLen(Number(newLinkLength))
    if (newLink.isPrintable && drawPathName !== '') newLink.selectNewPath(drawPathName)

    newSubject.needleStack.push(newNode)
    return this.getBasicResult(newSubject, newNode, newLink)
  }
}

export default CrochetOperationBasic
