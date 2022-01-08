import CrochetStitch from './crochetStitch.js'

class CrochetStitchOrigin extends CrochetStitch {
  get sequence () { return 'makeorigin' }
  get type () { return 'origin' }
  get desc () { return 'first stitch in any doily. should be only one in the whole doily.' }
  get requiresPrevious () { return false }
  get requiredLoops () { return 0 }
}

export default CrochetStitchOrigin
