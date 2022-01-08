import CrochetNode from './crochetNode.js'

class CrochetNodeHook extends CrochetNode {
  get type () { return 'hook' }
  get desc () { return "a node that must attach to other stitches' loops" }
  get color () { return 'brown' }
}

export default CrochetNodeHook
