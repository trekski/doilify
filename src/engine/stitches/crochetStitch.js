import IdGenerator from '../misc/helpers.js'
import CrochetOperationFactory from './operations/operationFactory.js'
import OperationSubject from './operations/operationSubject.js'

class CrochetStitch {
  // *** CLASS STATIC METHODS ***
  // and their wrappers to use them in instances
  get sequence () { return this._sequence } // reciupe how to create stitches internal graph
  get type () { return this._type } // unambiguous string for each subclass
  get requiresPrevious () { return this._reqPrev } // true if the stitch requires prev. sittches last loop to hook into
  get requiredLoops () { return this._reqLoops } // how manz other loops are needed to construct the stitch

  // *** CONSTRUCTOR ***
  constructor (type, requiresPrevious, requiredLoops, sequence, context) {
    // *** INIT STATIC ATTRIBUTES ***

    // Create dedicated stitch numbering sequence
    if (typeof CrochetStitch.COUNTER === 'undefined') {
      CrochetStitch.COUNTER = new IdGenerator('ST')
    };

    // *** PRIVATE ATTRIBUTES ***
    this._context = context
    this._nodes = []
    this._links = []
    this.id = CrochetStitch.COUNTER.next()
    this._type = type
    this._reqPrev = requiresPrevious
    this._reqLoops = requiredLoops
    this._sequence = sequence
  }

  crochet (attachToNode = null, otherLoops = []) {
    // temporary variables, used only when new Stitch is being created
    // to avoid immediate reactivity from Vue
    const newNodes = []
    const newLinks = []

    // validate call parameters
    if (this.requiresPrevious && attachToNode === null) throw new Error('crochetStitch : prev. stitch was required, but not provided')
    if (otherLoops.length < this.requiredLoops) throw new Error('crochetStitch: not enough other loops')

    const needle = []
    needle.push(attachToNode)
    let subject = new OperationSubject(needle, this, otherLoops)

    // create the stitch'es nodes and links according to the sequence
    const seq = this.sequence.split(';').map(e => e.trim())
    let instr = seq.shift()
    while (instr) {
      const tokens = instr.split(':').map(e => e.trim())
      const action = tokens.shift()
      const op = CrochetOperationFactory.getNewObject(action, subject, tokens)

      const res = op.exec()
      subject = res.subject

      if (res.newNode) newNodes.push(res.newNode)
      if (res.newLink) newLinks.push(res.newLink)
      if (res.delNode) {
        res.delNode
          .getNeighborLinks()
          .forEach(e => {
            e.apoptose()
          })
        const p = newNodes.indexOf(res.delNode)
        if (p > -1) newNodes.splice(p, 1)
      }
      if (res.delLink) {
        const p = newLinks.indexOf(res.delLink)
        if (p > -1) newLinks.splice(p, 1)
      }

      instr = seq.shift()
    }

    // finally reference  all newly created objects to the stitch
    this._nodes.splice(0, 0, ...newNodes)
    this._links.splice(0, 0, ...newLinks)

    this.orderLoops()
  }

  orderLoops () {
    console.clear()
    this._nodes.forEach(n => { n.ordinal = undefined })
    let node = this.getStartNode()
    let index = 0
    while (node.context !== this) {
      console.log(node.id, node.isLoopable, index)
      if (node.isLoopable) { node.ordinal = index++ }
      const link = node.getNeighborLinks('out', 'sequence')
      if (link.length < 1) break
      node = link[0].getOtherEnd(node)
    }
  }

  // *** PUBLIC METHODS ***

  // overrides the default .toString()
  toString () {
    return `[${this.id} (${this.type})]`
  }

  getNodes (nodeType = null) {
    return this._nodes.filter(
      node => (nodeType === null || node.type === nodeType)
    )
  };

  getLinks (linkType = null) {
    return this._links.filter(
      link => (linkType === null || link.type === linkType)
    )
  };

  getStartNode () {
    return (this.type === 'origin') ? this.getNodes()[0] : this.getNodes('start')[0]
  };

  getEndNode () {
    return (this.type === 'origin') ? this.getNodes()[0] : this.getNodes('finish')[0]
  };

  getPreviousStitch () {
    return this.getStartNode().getNeighborNodes('in')[0].context
  }

  getNextStitch () {
    return this.getEndNode().getNeighborNodes('out')[0].context
  }

  getFirstLoop () {
    let wrkNode = this.getStartNode() // start at the beginning
    const sameStitch = this

    while (wrkNode.getContext() === sameStitch) {
      // if possible,  return a "loop" node
      if (wrkNode.isLoopable) return wrkNode
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
      if (wrkNode.isLoopable) return wrkNode
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

  // if a stitch is to be removed, it needs to:
  // - remove all its nodes
  // - remove all its links
  apoptose () {
    this._links.forEach((item, i) => {
      item.apoptose()
    })
    this._links.splice(0)
    this._nodes.forEach((item, i) => {
      item.apoptose()
    })
    this._nodes.splice(0)
    this._context = undefined
  }
}

export default CrochetStitch
