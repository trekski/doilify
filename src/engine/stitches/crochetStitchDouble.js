import CrochetStitch from './crochetStitch.js'

class CrochetStitchDouble extends CrochetStitch {
  get sequence () { return 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:default:loop; mk:default:hook; mk:default:loop; merge:right' }
  get type () { return 'dc' }
  get desc () { return 'double crochet' }
  get requiresPrevious () { return true }
  get requiredLoops () { return 1 }
}

export default CrochetStitchDouble
