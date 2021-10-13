import CrochetNode from './crochetNode.js'

class CrochetNodeOrigin extends CrochetNode {
  get type () { return 'origin' }
  get desc () { return 'the first node in the crochet project' }
  get isLoopable () { return true }

  constructor (argContext, argCoordinates) {
    super(argContext, argCoordinates)
    // origin is ALWAYS fixed
    this.fx = this.x
    this.fy = this.y
  }
}

export default CrochetNodeOrigin
