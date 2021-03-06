import CrochetStitch from './crochetStitch.js'

class CrochetStitchSlip extends CrochetStitch {
  static getSequence () { return 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; merge:right' }
  static getType () { return 'slst' }
  static getDesc () { return 'double crochet' }
  static requiresPrevious () { return true }
  static requiredLoops () { return 1 }
}

export default CrochetStitchSlip
