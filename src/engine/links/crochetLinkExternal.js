import CrochetLink from './crochetLink.js'

class CrochetLinkExternal extends CrochetLink {
  static getType () { return 'external' }
  static getDeftLen () { return 10 }
  static getDesc () { return 'connects a nodes from two distinct stitches' }
}

export default CrochetLinkExternal
