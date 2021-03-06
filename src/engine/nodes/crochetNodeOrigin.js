import CrochetNode from './crochetNode.js'

class CrochetNodeOrigin extends CrochetNode {
  static getType () { return 'origin' }
  static getDesc () { return 'the first node in the crochet project' }
  static isLoopable () { return true }

  constructor (argContext, argCoordinates) {
    super(argContext, argCoordinates)
    // origin is ALWAYS fixed
    this.fx = this.x
    this.fy = this.y
  }
}

export default CrochetNodeOrigin
