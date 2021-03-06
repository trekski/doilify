import CrochetNode from './crochetNode.js'

class CrochetNodeStruct extends CrochetNode {
  static getType () { return 'struct' }
  static getDesc () { 'a node that is only there for structure modeling (neither LOOP, nor HOOK)' }
  static getColor () { return 'darkgray' }
}

export default CrochetNodeStruct
