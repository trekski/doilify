import CrochetOperation from './crochetOperation.js'
// import Vec2d from '../../misc/vector.js'

class CrochetOperationMerge extends CrochetOperation {
  get commandName () { return 'merge' }

  exec () {
    const cmd = this.params[0]
    const newSubject = this.subject.copy()

    let targetNode, sourceNode
    let deletedLink = false

    if (newSubject.needleStack.length < 2) throw new Error('crochetOperationMerge : not enough nodes on needle to merge')

    if (cmd === 'left') {
      targetNode = newSubject.needleStack.pop()
      sourceNode = newSubject.needleStack.pop()
    } else if (cmd === 'right') {
      sourceNode = newSubject.needleStack.pop()
      targetNode = newSubject.needleStack.pop()
    } else {
      if (cmd !== 'left' && cmd !== 'right') throw new Error(`crochetOperationMerge : Expected direction to be 'left' or 'right', got '${cmd}'`)
    }

    const newPosition = sourceNode
      .getVector()
      .add(targetNode.getVector())
      .scale(0.5)

    targetNode.setVector(newPosition)

    const linksToTransfer = sourceNode.getNeighborLinks()
    const existingNeighbors = targetNode.getNeighborNodes()

    linksToTransfer.forEach(e => {
      // if target and source were linked, this link is not valid anymore
      if (e.getOtherEnd(sourceNode) === targetNode) {
        deletedLink = e
      } else {
        if (!existingNeighbors.includes(e.getOtherEnd(sourceNode))) { e.replaceNode(sourceNode, targetNode) }
      }
    })

    const res = this.getBasicResult(newSubject, false, false, sourceNode, deletedLink)
    return res
  }
}

export default CrochetOperationMerge
