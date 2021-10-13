import CrochetNode from './crochetNode.js'

class CrochetNodeLoop extends CrochetNode {
  // constructor(context, position){super(context, position)}
  get type () { return 'loop' }
  get desc () { return "a node that other stitches' hooks can attach to" }
  get isLoopable () { return true }
  get color () { return 'blue' }
}

export default CrochetNodeLoop
