import FactoryClass from '../misc/factory.js'
import CrochetLink from './crochetLink.js'

import CrochetLinkSequential from './crochetLinkSequential.js'
import CrochetLinkExternal from './crochetLinkExternal.js'
import CrochetLinkCHSpace from './crochetLinkCHSpace.js'
import CrochetLinkZero from './crochetLinkZero.js'
import CrochetDraw from './crochetDraw.js'
import DrawCH from './drawCH.js'
import DrawSC from './drawSC.js'
import DrawHDC from './drawHDC.js'
import DrawDC from './drawDC.js'
import DrawTRC from './drawTRC.js'

const crochetLinkFactory = new FactoryClass(CrochetLink, 'type')

crochetLinkFactory
  .registerClass(CrochetLink)
  .registerClass(CrochetLinkSequential)
  .registerClass(CrochetLinkExternal)
  .registerClass(CrochetLinkCHSpace)
  .registerClass(CrochetLinkZero)
  .registerClass(CrochetDraw)
  .registerClass(DrawCH)
  .registerClass(DrawSC)
  .registerClass(DrawHDC)
  .registerClass(DrawDC)
  .registerClass(DrawTRC)

export default crochetLinkFactory
