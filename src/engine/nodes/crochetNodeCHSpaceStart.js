import CrochetNode from './crochetNode.js'

class CrochetNodeCHSpaceStart extends CrochetNode {
  get type () { return 'ch_sp_start' }
  get desc () { return "first (not removable) loop of a 'chain space'. It carries ch.sp. total len." }
  get color () { return 'yellow' }
}

export default CrochetNodeCHSpaceStart
