import CrochetLink from './crochetLink.js'

class CrochetLinkZero extends CrochetLink {
  static getType () { return 'zero' }
  static getDeftLen () { return 0 }
  static getDesc () { return 'zero-lenght link' }
}

export default CrochetLinkZero
