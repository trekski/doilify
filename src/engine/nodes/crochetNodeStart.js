import CrochetNode from './crochetNode.js'

class CrochetNodeStart extends CrochetNode {
  get type () { return 'start' }
  get desc () { return 'first node of a stitch. Also its first hook' }
  get color () { return 'green' }
}

export default CrochetNodeStart
