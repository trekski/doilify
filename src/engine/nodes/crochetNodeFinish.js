import CrochetNode from './crochetNode.js'

class CrochetNodeFinish extends CrochetNode {
  get type () { return 'finish' }
  get desc () { return 'last node of a stitch. Also its last loop' }
  get isLoopable () { return true }
  get color () { return 'red' }
}

export default CrochetNodeFinish
