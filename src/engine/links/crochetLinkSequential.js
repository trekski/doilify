import CrochetLink from './crochetLink.js'

class CrochetLinkSequential extends CrochetLink {
  static getType () { return 'sequence' }
  static getDeftLen () { return 10 }
  static getDesc () { return 'connects nodes from the main sequence' }
  static getColor () { return '#333' }
}

export default CrochetLinkSequential
