import CrochetNode from './crochetNode.js'

class CrochetNodeOrigin extends CrochetNode {
  // et type () { return 'origin' }
  // get desc () { return 'the first node in the crochet project' }
  // get isLoopable () { return true }

  constructor (...args) {
    super(...args)
    // origin is ALWAYS fixed
    this.fx = this.x
    this.fy = this.y
  }
}

export default CrochetNodeOrigin
