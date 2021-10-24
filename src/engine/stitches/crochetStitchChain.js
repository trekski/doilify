import CrochetStitch from './crochetStitch.js'

class CrochetStitchChain extends CrochetStitch {
  get sequence () { return 'mk:external:start; mk:sequence:finish' }
  get type () { return 'ch' }
  get desc () { return 'simplest chain stitch' }
  get requiresPrevious () { return true }
  get requiredLoops () { return 0 }
}

export default CrochetStitchChain
