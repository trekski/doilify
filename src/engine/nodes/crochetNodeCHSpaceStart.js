import CrochetNode from './crochetNode.js'

class CrochetNodeCHSpaceStart extends CrochetNode {
  static getType () { return 'ch_sp_start' }
  static getDesc () { return "first (not removable) loop of a 'chain space'. It carries ch.sp. total len." }
  static getColor () { return 'yellow' }
}

export default CrochetNodeCHSpaceStart
