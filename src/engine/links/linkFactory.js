import FactoryClass from '../misc/factory.js'
import CrochetLink from './crochetLink.js'

import CrochetLinkSequential from './crochetLinkSequential.js'
import CrochetLinkExternal from './crochetLinkExternal.js'
import CrochetLinkCHSpace from './crochetLinkCHSpace.js'
import CrochetLinkZero from './crochetLinkZero.js'
import CrochetDraw from './crochetDraw.js'

const crochetLinkFactory = new FactoryClass(CrochetLink, 'getType')

crochetLinkFactory
  .registerClass(CrochetLinkSequential)
  .registerClass(CrochetLinkExternal)
  .registerClass(CrochetLinkCHSpace)
  .registerClass(CrochetLinkZero)
  .registerClass(CrochetDraw)

export default crochetLinkFactory
