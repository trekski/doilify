import CrochetNode from './crochetNode.js'

class CrochetNodeCHSpaceCont extends CrochetNode {
  get type () { return 'ch_sp_cont' }
  get desc () { return "any subsequent node of a 'chain space'" }
  get color () { return 'violet' }
}

export default CrochetNodeCHSpaceCont
