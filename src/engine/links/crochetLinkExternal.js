import CrochetLink from './crochetLink.js'

class CrochetLinkExternal extends CrochetLink {
  get type () { return 'external' }
  get defLen () { return 5 }
  get desc () { return 'connects a nodes from two distinct stitches' }
}

export default CrochetLinkExternal
