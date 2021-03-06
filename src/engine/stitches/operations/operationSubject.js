// just a wrapper class to ensure that all crochet oprations speak the same "language"

// import CrochetStitch from '../crochetStitch.js'
import CrochetNode from '../../nodes/crochetNode.js'

class OperationSubject {
  constructor (needle = [], stitch, otherLoops = []) {
    if (!(needle instanceof Array)) throw new Error('crochet operationSubject : needle must be an Array [crochetNode]')
    if (!(otherLoops instanceof Array)) throw new Error('crochet operationSubject : otherLoops must be an Array [crochetNode]')
    // if (!(stitch instanceof CrochetStitch)) throw new Error('crochet operationSubject : stitch must be an instance of CrochetStitch')
    this.needleStack = needle.filter(e => (e instanceof CrochetNode))
    this.contextStitch = stitch
    this.otherLoops = otherLoops.filter(e => (e instanceof CrochetNode))
  }

  copy () {
    return new OperationSubject(this.needleStack, this.contextStitch, this.otherLoops)
  }
}

export default OperationSubject
