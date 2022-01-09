import CrochetOperation from './crochetOperation.js'
import Vec2d from '../../misc/vector.js'

class CrochetOperationBasic extends CrochetOperation {
  get commandName () { return 'mk' }
  get minParams () { return 2 }

  static CALC_DEF_NEW_POS (fromNode, len) {
    // setup
    // const len = newLinkLength
    const start = fromNode.getVector()

    console.group('CALC_DEF_NEW_POS')
    console.log('from node: ', fromNode)
    console.log('len:  ', len)

    // initial direction of the new position is relative to fromNode
    // pointing away from center of mass of its neighbors
    let neighbors = fromNode.getNeighborNodes() // by def. fromnode will be excluded
    // #############

    // remove the toNode from the neighbors   !!!!!!
    neighbors.filter(e => true)

    // ###############
    console.group('what are the neighbours')
    console.log(fromNode._links)
    console.groupEnd()
    if (neighbors.length === 0) neighbors = [fromNode]
    const neighborVecs = neighbors.map(e => e.getVector())
    const avgNeighborVec = Vec2d.SUM(neighborVecs).scale(1 / neighborVecs.length)
    let delta = start.sub(avgNeighborVec)

    console.log('before:', delta, delta.len())

    // fix corner cases
    if (delta.len() > 0) {
      // delta<>(0,0) => neighbors' CoM is not same as fromNode => go in opposite dir to it
      delta.len(len)

      console.log('after:', delta)
      // only one neighbor => extend the fromnode position outwards but turn by PI/20
      // if (neighbors[0] === fromNode) { delta = delta.rot(Math.PI / 20) };
      console.log(neighbors.length)
      if (neighbors.length === 1) { delta = delta.rot(Math.PI / 10) };
      console.log('OK')
    } else {
      console.log('delta was zero')
      // delta == (0,0), then
      // default direction is UP
      // unless start node was off-center by a enough, then follow that
      const dir = (start.len() < 0.01) ? new Vec2d(-1, 0) : start.unit().rot(Math.PI / 10)
      delta = dir.len(len)
    }

    console.groupEnd()
    return start.add(delta)
  }

  exec () {
    // const newSubject, sourceNode, newNodeType, newNode, newLinkType, newLink, newPos
    console.group('crochetOperationBasic > exec')

    // const [newLinkType, newNodeType] = this.params
    const [newLinkType, newNodeType, newLinkLength = false, drawPathName = ''] = this.params // newLinkLength might be undefined!
    const newSubject = this.subject.copy()
    const sourceNode = newSubject.needleStack.pop()
    const newNode = CrochetOperation.nodeFactory.getNewObject(newNodeType, this.subject.contextStitch, sourceNode.getVector())

    const newLink = CrochetOperation.linkFactory.getNewObject(newLinkType, this.subject.contextStitch, sourceNode, newNode)

    const linkLength = (newLinkLength !== false)
      ? newLinkLength
      : newLink.defLen

    console.log('source node:', sourceNode)
    console.log('link type: ', newLinkType)
    console.log('applicable link length: ', linkLength)

    const newPos = CrochetOperationBasic.CALC_DEF_NEW_POS(sourceNode, linkLength) // ??? where to put this function best ???
    console.log('new pos.:', newPos)
    newNode.setVector(newPos)

    if (newLinkLength !== false) newLink.setLen(Number(newLinkLength))

    console.log('printalbe: ', newLink.isPrintable)
    console.log('path name:', drawPathName)
    if (newLink.isPrintable && drawPathName !== '') newLink.selectNewPath(drawPathName)
    newSubject.needleStack.push(newNode)
    console.groupEnd()
    return this.getBasicResult(newSubject, newNode, newLink)
  }
}

export default CrochetOperationBasic
