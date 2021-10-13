import CrochetStitch from './crochetStitch.js'

class CrochetStitchSlip extends CrochetStitch {
  get sequence () { return 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; merge:right' }
  get type () { return 'slst' }
  get desc () { return 'double crochet' }
  get requiresPrevious () { return true }
  get requiredLoops () { return 1 }
}

export default CrochetStitchSlip
