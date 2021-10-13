import CrochetNode from './crochetNode.js'

class CrochetNodeStruct extends CrochetNode {
  get type () { return 'struct' }
  get desc () { 'a node that is only there for structure modeling (neither LOOP, nor HOOK)' }
  get color () { return 'darkgray' }
}

export default CrochetNodeStruct
