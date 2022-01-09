import FactoryClass from '../misc/factory.js'
import CrochetLink from './crochetLink.js'

// import CrochetLinkSequential from './crochetLinkSequential.js'
// import CrochetLinkExternal from './crochetLinkExternal.js'
// import CrochetLinkCHSpace from './crochetLinkCHSpace.js'
// import CrochetLinkZero from './crochetLinkZero.js'
import CrochetDraw from './crochetDraw.js'
// import DrawCH from './drawCH.js'
// import DrawSC from './drawSC.js'
// import DrawHDC from './drawHDC.js'
// import DrawDC from './drawDC.js'
// import DrawTRC from './drawTRC.js'

const crochetLinkFactory = new FactoryClass(CrochetLink, false, 4)

crochetLinkFactory
  .registerClass(CrochetLink, 'default', ['default', 5, false, 'lightgray'])
  // .registerClass(CrochetLinkSequential)
  .registerClass(CrochetLink, 'sequence', ['sequence', 5, false, '#333'])
  // .registerClass(CrochetLinkExternal)
  .registerClass(CrochetLink, 'external', ['external', 5, false, 'lightgray'])
  // .registerClass(CrochetLinkCHSpace)
  .registerClass(CrochetLink, 'chain_space', ['chain_space', 10, false, 'lightgray'])
  // .registerClass(CrochetLinkZero)
  .registerClass(CrochetLink, 'zero', ['zero', 0, false, 'lightgray'])
  // .registerClass(CrochetDraw)
  .registerClass(CrochetDraw, 'draw', ['sequence', 5, true, 'lightgray'])
  // .registerClass(DrawCH)
  // .registerClass(DrawSC)
  // .registerClass(DrawHDC)
  // .registerClass(DrawDC)
  // .registerClass(DrawTRC)

export default crochetLinkFactory
