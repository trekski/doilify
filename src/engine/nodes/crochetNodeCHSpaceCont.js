import CrochetNode from './crochetNode.js'

class CrochetNodeCHSpaceCont extends CrochetNode {
  static getType () { return 'ch_sp_cont' }
  static getDesc () { return "any subsequent node of a 'chain space'" }
  static getColor () { return 'violet' }
}

export default CrochetNodeCHSpaceCont
