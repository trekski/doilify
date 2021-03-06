import FactoryClass from '../misc/factory.js'
import CrochetStitch from './crochetStitch.js'

import CrochetStitchOrigin from './crochetStitchOrigin.js'
import CrochetStitchChain from './crochetStitchChain.js'
import CrochetStitchSingle from './crochetStitchSingle.js'
import CrochetStitchDouble from './crochetStitchDouble.js'
import CrochetStitchSlip from './crochetStitchSlip.js'

const crochetStitchFactory = new FactoryClass(CrochetStitch, 'getType')

crochetStitchFactory
  .registerClass(CrochetStitchOrigin)
  .registerClass(CrochetStitchChain)
  .registerClass(CrochetStitchSingle)
  .registerClass(CrochetStitchDouble)
  .registerClass(CrochetStitchSlip)

export default crochetStitchFactory
