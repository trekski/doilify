import CrochetStitch from './crochetStitch.js'

class CrochetStitchChain extends CrochetStitch {
  static getSequence () { return 'mk:external:start;mk:sequence:finish' }
  static getType () { return 'ch' }
  static getDesc () { return 'simplest chain stitch' }
  static requiresPrevious () { return true }
  static requiredLoops () { return 0 }
}

export default CrochetStitchChain
