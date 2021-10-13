import CrochetLink from './crochetLink.js'

class CrochetLinkCHSpace extends CrochetLink {
  get type () { return 'chain_space' }
  get defLen () { return 10 }
  get desc () { return 'links in a chainspace' }
}

export default CrochetLinkCHSpace
