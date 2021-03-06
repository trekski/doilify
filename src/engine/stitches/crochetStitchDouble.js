import CrochetStitch from './crochetStitch.js'

class CrochetStitchDouble extends CrochetStitch {
  static getSequence () { return 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:default:loop; mk:default:hook; mk:default:loop; merge:right' }
  static getType () { return 'dc' }
  static getDesc () { return 'double crochet' }
  static requiresPrevious () { return true }
  static requiredLoops () { return 1 }
}

export default CrochetStitchDouble
