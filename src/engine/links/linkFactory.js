import FactoryClass from '../misc/factory.js'

import CrochetLink from './crochetLink.js'
import CrochetDraw from './crochetDraw.js'

const crochetLinkFactory = new FactoryClass(CrochetLink, false, 4)

crochetLinkFactory
  .registerClass(CrochetLink, 'default', ['default', 5, false, 'lightgray'])
  .registerClass(CrochetLink, 'sequence', ['sequence', 5, false, '#333'])
  .registerClass(CrochetLink, 'external', ['external', 5, false, 'lightgray'])
  .registerClass(CrochetLink, 'chain_space', ['chain_space', 10, false, 'lightgray'])
  .registerClass(CrochetLink, 'zero', ['zero', 0, false, 'lightgray'])
  .registerClass(CrochetDraw, 'draw', ['sequence', 5, true, 'lightgray'])

export default crochetLinkFactory
