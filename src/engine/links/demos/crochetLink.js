import CrochetLink from '../crochetLink.js'
import CrochetLinkExternal from '../crochetLinkExternal.js'
import CrochetLinkSequential from '../crochetLinkSequential.js'
import CrochetLinkZero from '../crochetLinkZero.js'
import CrochetLinkCHSpace from '../crochetLinkCHSpace.js'

function crochetLinkDemo (log) {
  const n1 = { x: 1, y: 2, registerNeighbor: () => {} }
  const n2 = { x: -1, y: 3, registerNeighbor: () => {} }
  const n3 = { x: -5, y: -5, registerNeighbor: () => {} }

  let l = new CrochetLink('A', n1, n2)
  log(`${l} : type ${l.getType()}`)

  l = new CrochetLinkExternal('A', n1, n3)
  log(`${l} : len ${l.getDefLen()} `)

  l = new CrochetLinkSequential('A', n2, n3)
  log(`${l} : color ${l.getColor()} `)

  l = new CrochetLinkZero('A', n3, n1)
  log(`${l} : ends n3 ${l.getOtherEnd(n3)} `)
  log(`${l} : ends n2 ${l.getOtherEnd(n2)} `)

  l = new CrochetLinkCHSpace('A', n3, n2)
  log(`${l} : desc ${l.getDesc()} `)
}

export default crochetLinkDemo