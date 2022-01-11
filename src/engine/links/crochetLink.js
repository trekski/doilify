import IdGenerator from '../misc/helpers.js'
// import Vec2d from '../misc/vector.js'

class CrochetLink {
  // *** CLASS STATIC METHODS ***
  // and their wrappers to use them in instances

  get defLen () { return this._defLen } // link lenght for ForceLayout simulation

  get type () { return this._type } // unambiguous string for each subclass

  // get desc () { return 'default link class' } // human friendly desc.

  get isPrintable () { return this._isPrintable } // should it be drawn in documents

  get isDeleted () { return this.is_deleted }

  get color () { return this._color } // how to draw it

  // *** CONSTRUCTOR ***

  constructor (
    type = 'default',
    defLen = 5,
    isPrintable = false,
    color = 'lightgray',
    context,
    fromNode,
    toNode,
    length = undefined
  ) {
    // *** STATIC ATTRIBUTES ***

    // Create dedicated link numbering sequence
    if (typeof CrochetLink.COUNTER === 'undefined') {
      CrochetLink.COUNTER = new IdGenerator('LK')
    };

    // *** PRIVATE ATTRIBUTES ***

    // class-like
    this._defLen = defLen
    this._type = type
    this._isPrintable = isPrintable
    this._color = color

    // basic
    this.source = fromNode
    this.target = toNode
    this._context = context
    // for future: removing nodes form simulation without destrying the objects => ready for u-do action
    this.is_deleted = false

    // physics
    if (length === undefined) {
      this._length = this.defLen
    } else {
      if (typeof length !== 'number') throw new Error('length must be a number')
      this._length = length
    }

    // references
    this.id = CrochetLink.COUNTER.next()

    // *** HOUSEKEEPING - CREATION ***
    fromNode.registerNeighbor(this)
    toNode.registerNeighbor(this)
  }

  // methods needed for D3JS simulation
  strength () {
    return (this.is_deleted) ? 0 : 1
    // return 1 / Math.min(this.source.getNeighborCount(), this.target.getNeighborCount())
  }

  // *** PUBLIC METHODS ***

  // if a link is to be removed, it needs to:
  // - be remove from neighbors list and clear its references
  // - be un-registered form all contexts
  apoptose () {
    this.source.unRegisterNeighbor(this)
    this.target.unRegisterNeighbor(this)
    this.source = undefined
    this.target = undefined
    this._context = undefined
  }

  getContext () { return this._context }

  // overrides the default .toString()
  toString () {
    return `[${this.id} (${this.type}): ${this.source.id} > ${this.target.id} ]`
  }

  getOtherEnd (node) {
    if (this.source === node) {
      return this.target
    } else if (this.target === node) {
      return this.source
    } else {
      return false
    };
  };

  // Return the real (geometrical) length of this link
  getRealLen () {
    return this.source.getVector().sub(this.target.getVector()).len()
  };

  // wrapper for the _length that can return derivatives, that depend on neighborhood
  // will be used in "chainspace" stitches
  // intended as the default accessor of link lenght for D3JS
  getLen () {
    return this._length
  }

  setLen (l) {
    if (typeof l !== 'number') return
    this._length = l
  }

  // get all neighbouring nodes of the two connected nodes
  getNeighborhood (withEnds = true) {
    let nodes = this.source.getNeighborNodes().concat(this.target.getNeighborNodes())
    if (withEnds) {
      nodes = nodes
        .concat(this.target)
        .concat(this.source)
    }
    return nodes
  }

  // replace one of the connected nodes
  replaceNode (oldNode, newNode) {
    if (newNode === this.source || newNode === this.target) throw new Error('crocherLink.replaceNode : new node not distinct')
    if (oldNode !== this.source && oldNode !== this.target) throw new Error('crocherLink.replaceNode : old node not from link')
    if (oldNode._context !== newNode._context) throw new Error('crocherLink.replaceNode : both nodes must be fro msmae Stitch')

    if (oldNode === this.source) {
      this.source = newNode
    } else if (oldNode === this.target) {
      this.target = newNode
    };

    newNode.registerNeighbor(this)
    oldNode.unRegisterNeighbor(this)

    return this
  }
}

export default CrochetLink
