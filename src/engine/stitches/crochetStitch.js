import IdGenerator from '../misc/helpers.js'
import CrochetNode from '../nodes/crochetNode.js'
import crochetOperationFactory from './operations/operationFactory.js'
import OperationSubject from './operations/operationSubject.js'

class CrochetStitch {
  // *** CLASS STATIC METHODS ***
  // and their wrappers to use them in instances

  static getSequence () { return 'mk:default:default' } // reciupe how to create stitches internal graph
  getSequence () { return this.constructor.getSequence() }

  static getType () { return 'default' } // unambiguous string for each subclass
  getType () { return this.constructor.getType() }

  static getDesc () { return 'default stitch class' } // human friendlz description
  getDesc () { return this.constructor.getDesc() }

  static requiresPrevious () { return true } // true if the stitch requires prev. sittches last loop to hook into
  requiresPrevious () { return this.constructor.requiresPrevious() }

  static requiredLoops () { return 0 } // how manz other loops are needed to construct the stitch
  requiredLoops () { return this.constructor.requiredLoops() }

  // *** CONSTRUCTOR ***

  constructor (context, attachToNode = null, otherLoops = []) {
    // *** STATIC ATTRIBUTES ***

    // Create dedicated stitch numbering sequence
    if (typeof CrochetStitch.COUNTER === 'undefined') {
      CrochetStitch.COUNTER = new IdGenerator('ST')
    };

    // *** PRIVATE ATTRIBUTES ***

    this._context = context
    this._nodes = new Map()
    this._links = new Map()
    this.id = CrochetStitch.COUNTER.next()

    // validate call parameters
    if (this.requiresPrevious() && attachToNode === null) throw new Error('crochetStitch : prev. stitch was required, but not provided')
    if (attachToNode !== null && !(attachToNode instanceof CrochetNode)) throw new Error(`crochetStitch : attachToNode must be an instance o crochetNode. Got: ${attachToNode.constructor.name}`)
    const loops = otherLoops.filter(e => (e instanceof CrochetNode)) // also a shallow copy
    if (loops.length < this.requiredLoops()) throw new Error('crochetStitch: not enough other loops')

    // setup stitch creation parameters
    const seq = this.getSequence().split(';').map(e => e.trim())
    const needle = []
    needle.push(attachToNode)
    let instr = ''
    let subject = new OperationSubject(needle, this, loops)

    // create the stitch'es nodes and links according to the dequence
    instr = seq.shift()
    while (instr) {
      const tokens = instr.split(':').map(e => e.trim())
      const action = tokens.shift()
      const op = crochetOperationFactory.getNewObject(action, subject, tokens)
      const res = op.exec()
      subject = res.subject

      if (res.newNode) this._nodes.set(res.newNode)
      if (res.newLink) this._links.set(res.newLink)
      if (res.delNode) {
        res.delNode
          .getNeighborLinks()
          .forEach(e => {
            e.apoptose()
            this._links.delete(e)
          })
        this._nodes.delete(res.delNode)
      }
      if (res.delLink) this._links.delete(res.delLink)
      instr = seq.shift()
    }
  }

  // *** PUBLIC METHODS ***

  // overrides the default .toString()
  toString () {
    return '[CrochetStitch ' + this._id + ']'
  }

  getNodes (nodeType = null) {
    const nodes = Array
      .from(this._nodes.keys())
      .filter(e => (nodeType === null || e.getType() === nodeType))
    return nodes
  };

  getLinks (linkType = null) {
    const links = Array
      .from(this._links.keys())
      .filter(e => (linkType === null || e.getType() === linkType))
    return links
  };

  getStartNode () {
    return (this.getType() === 'origin') ? this.getNodes()[0] : this.getNodes('start')[0]
  };

  getEndNode () {
    return (this.getType() === 'origin') ? this.getNodes()[0] : this.getNodes('finish')[0]
  };

  getPreviousStitch () {
    return this.getStartNode.getNeighborNodes('in', 'finish').getContext()
  }

  getNextStitch () {
    return this.getEndNode.getNeighborNodes('out', 'start').getContext()
  }

  getFirstLoop () {
    let wrkNode = this.getStartNode() // start at the beginning
    const sameStitch = this

    while (wrkNode.getContext() === sameStitch) {
      // if possible,  return a "loop" node
      if (wrkNode.isLoopable()) return wrkNode
      // otherwise, proceed to next node in main sequence
      const nextStchs = wrkNode.getNeighborLinks('out', 'sequence')
      if (nextStchs.length > 0) {
        wrkNode = nextStchs[0].getOtherEnd(wrkNode)
      } else {
        return false // nothing was found :(
      }
    }

    return false // nothing was found :(
  }

  getLastLoop () {
    let wrkNode = this.getEndNode() // start at the beginning
    const sameStitch = this

    while (wrkNode.getContext() === sameStitch) {
      // if possible,  return a "loop" node
      if (wrkNode.isLoopable()) return wrkNode
      // otherwise, proceed to next node in main sequence
      const nextStchs = wrkNode.getNeighborLinks('in', 'sequence')
      if (nextStchs.length > 0) {
        wrkNode = nextStchs[0].getOtherEnd(wrkNode)
      } else {
        return false // nothing was found :(
      }
    }

    return false // nothing was found :(
  }

  getNextLoop (currentLoop, forceProgress) {
    // to do: add exception for chain spaces

    let wrkNode = currentLoop // start somewhere
    let cont = true

    while (cont) {
      // proceed to next node in main sequence
      const nextStchs = wrkNode.getNeighborLinks('out', 'sequence')
      if (nextStchs.length > 0) {
        // if possible,  return a "loop" node
        wrkNode = nextStchs[0]
        if (wrkNode.isLoopable()) return wrkNode
      } else {
        // if no more nodes, stop the search
        cont = false
      }
    }

    return false // nothing was found :(
  }
}

export default CrochetStitch
