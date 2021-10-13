import CrochetOperation from './crochetOperation.js'
import Vec2d from '../../misc/vector.js'

class CrochetOperationBasic extends CrochetOperation {
  get commandName () { return 'mk' }
  get minParams () { return 2 }

  static CALC_DEF_NEW_POS (fromNode, byLinkType) {
    // setup
    const len = CrochetOperation.getLinkDefLen(byLinkType)
    const start = fromNode.getVector()

    // initial direction of the new position is relative to fromNode
    // pointing away from center of mass of its neighbors
    let neighbors = fromNode.getNeighborNodes() // by def. fromnode will be excluded
    if (neighbors.length === 0) neighbors = [fromNode]
    const neighborVecs = neighbors.map(e => e.getVector())
    const avgNeighborVec = Vec2d.SUM(neighborVecs).scale(1 / neighborVecs.length)
    let delta = start.sub(avgNeighborVec)

    // fix corner cases
    if (delta.len() > 0) {
      // delta<>(0,0) => neighbors' CoM is not same as fromNode => go in opposite dir to it
      delta = delta.len(len)
      // CoM same as fromNode => extend the fromnode position outwards but turn by PI/20
      if (neighbors[0] === fromNode) { delta = delta.rot(Math.PI / 20) };
    } else {
      // delta == (0,0), then
      // default direction is UP
      // unless start node was off-center by a enough, then follow that
      const dir = (start.len() < 0.01) ? new Vec2d(0, -1) : start.unit().rot(Math.PI / 20)
      delta = dir.len(len)
    }

    return start.add(delta)
  }

  exec () {
    // const newSubject, sourceNode, newNodeType, newNode, newLinkType, newLink, newPos

    const [newLinkType, newNodeType] = this.params
    const newSubject = this.subject.copy()
    const sourceNode = newSubject.needleStack.pop()
    const newPos = CrochetOperationBasic.CALC_DEF_NEW_POS(sourceNode, newLinkType) // ??? where to put this function best ???
    const newNode = CrochetOperation.nodeFactory.getNewObject(newNodeType, this.subject.contextStitch, newPos)
    const newLink = CrochetOperation.linkFactory.getNewObject(newLinkType, this.subject.contextStitch, sourceNode, newNode)
    newSubject.needleStack.push(newNode)

    return this.getBasicResult(newSubject, newNode, newLink)
  }
}

export default CrochetOperationBasic
