import IdGenerator from '../misc/helpers.js'
import CrochetOperationFactory from './operations/operationFactory.js'
import OperationSubject from './operations/operationSubject.js'

class CrochetStitch {
  // *** CLASS STATIC METHODS ***
  // and their wrappers to use them in instances

  get sequence () { return this._sequence } // reciupe how to create stitches internal graph

  get type () { return this._type } // unambiguous string for each subclass

  // get desc () { return 'default stitch class' } // human friendlz description

  get requiresPrevious () { return this._reqPrev } // true if the stitch requires prev. sittches last loop to hook into

  get requiredLoops () { return this._reqLoops } // how manz other loops are needed to construct the stitch

  // *** CONSTRUCTOR ***

  constructor (type, requiresPrevious, requiredLoops, sequence, context, attachToNode = null, otherLoops = []) {
    // *** STATIC ATTRIBUTES ***

    console.group('Stitch > cosntructor')
    console.log('type: ', type)
    console.log('req. perv.: ', requiresPrevious)
    console.log('req. loops: ', requiredLoops)
    console.log('seq.: ', sequence)
    console.log('context: ', context)
    console.log('attatch to: ', attachToNode)
    console.log('loops: ', otherLoops)
    console.groupEnd()

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

    // temporary variables, used only when new Stitch is being created
    // to avoid immediate reactivity from Vue
    const newNodes = []
    const newLinks = []

    // validate call parameters
    if (this.requiresPrevious && attachToNode === null) throw new Error('crochetStitch : prev. stitch was required, but not provided')
    if (otherLoops.length < this.requiredLoops) throw new Error('crochetStitch: not enough other loops')

    // setup stitch creation parameters
    const seq = this.sequence.split(';').map(e => e.trim())
    let instr = ''

    console.groupCollapsed('initial subject')
    console.log('attatch to: ', attachToNode)
    const needle = []
    needle.push(attachToNode)
    console.log('needle: ', needle)
    console.log('needle[0]: ', needle[0])
    console.log('other loops:', otherLoops)
    let subject = new OperationSubject(needle, this, otherLoops)
    console.groupEnd()

    // create the stitch'es nodes and links according to the dequence
    instr = seq.shift()
    while (instr) {
      //
      console.group('execute the operations')
      const tokens = instr.split(':').map(e => e.trim())
      const action = tokens.shift()
      const op = CrochetOperationFactory.getNewObject(action, subject, tokens)
      console.log('action: ', action)
      console.log('tokens: ', tokens)
      console.log('subject:', subject)
      console.log(op)
      const res = op.exec()
      console.log('SUCCESS!!!')

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
      console.groupEnd()
    }
    // here you can finally assign all newly created links and nodes
    // to the stitch object's attributes
    this._nodes.splice(0, 0, ...newNodes)
    this._links.splice(0, 0, ...newLinks)
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
