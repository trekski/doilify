import CrochetNode from './crochetNode.js'

class CrochetNodeFinish extends CrochetNode {
  static getType () { return 'finish' }
  static getDesc () { return 'last node of a stitch. Also its last loop' }
  static isLoopable () { return true }
  static getColor () { return 'red' }
}

export default CrochetNodeFinish
