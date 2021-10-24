import CrochetStitch from './crochetStitch.js'

class CrochetStitchSingle extends CrochetStitch {
  get sequence () { return 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:default:loop; merge:right' }
  get type () { return 'sc' }
  get desc () { return 'single crochet' }
  get requiresPrevious () { return true }
  get requiredLoops () { return 1 }
}

export default CrochetStitchSingle
