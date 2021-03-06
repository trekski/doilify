import CrochetLink from './crochetLink.js'

class CrochetLinkCHSpace extends CrochetLink {
  static getType () { return 'chain_space' }
  static getDeftLen () { return 10 }
  static getDesc () { return 'links in a chainspace' }
}

export default CrochetLinkCHSpace
