import FactoryClass from '../misc/factory.js'
import CrochetStitch from './crochetStitch.js'

// import CrochetStitchOrigin from './crochetStitchOrigin.js'
// import CrochetStitchChain from './crochetStitchChain.js'
// import CrochetStitchSingle from './crochetStitchSingle.js'
// import CrochetStitchDouble from './crochetStitchDouble.js'
// import CrochetStitchSlip from './crochetStitchSlip.js'

const CrochetStitchFactory = new FactoryClass(CrochetStitch, false, 4)

CrochetStitchFactory
  .registerClass(CrochetStitch, 'default', ['default', true, 0, 'mk:default:default'])
  // .registerClass(CrochetStitchOrigin)
  .registerClass(CrochetStitch, 'origin', ['origin', false, 0, 'makeorigin'])
  // .registerClass(CrochetStitchChain)
  .registerClass(CrochetStitch, 'ch', ['ch', true, 0, 'mk:external:start; mk:draw:finish:5:ch'])
  // .registerClass(CrochetStitchSingle)
  .registerClass(CrochetStitch, 'sc', ['sc', true, 1, 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:draw:loop:5:sc; merge:right'])
  // .registerClass(CrochetStitchDouble)
  .registerClass(CrochetStitch, 'dc', ['dc', true, 1, 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:draw:loop:15:dc; merge:right'])
  // .registerClass(CrochetStitchSlip)
  .registerClass(CrochetStitch, 'slst', ['slst', true, 1, 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; merge:right'])

export default CrochetStitchFactory
