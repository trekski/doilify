import CrochetNode from './crochetNode.js'

class CrochetNodeStart extends CrochetNode {
  static getType () { return 'start' }
  static getDesc () { return 'first node of a stitch. Also its first hook' }
  static getColor () { return 'green' }
}

export default CrochetNodeStart
