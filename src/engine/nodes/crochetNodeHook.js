import CrochetNode from './crochetNode.js'

class CrochetNodeHook extends CrochetNode {
  static getType () { return 'hook' }
  static getDesc () { return "a node that must attach to other stitches' loops" }
  static getColor () { return 'brown' }
}

export default CrochetNodeHook
