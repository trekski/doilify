import IdGenerator from '../misc/helpers.js'
import Vec2d from '../misc/vector.js'

class CrochetNode {
// *** CLASS STATIC METHODS ***
  // and their wrappers to use them in instances

  get type () { return 'default' } // unambiguous string for each subclass

  get desc () { return 'default node class' } // human freindlz class desc.

  get isLoopable () { return false } // can the node serve as a "loop" node other stitches conenct to

  get color () { return 'black' } // how to draw the node

  constructor (argContext, argCoordinates) {
    //  STATIC ATTRIBUTES

    // create dedicated node numbering sequence
    if (typeof CrochetNode.COUNTER === 'undefined') {
      CrochetNode.COUNTER = new IdGenerator('ND')
    }

    // Parse and validate constructor argumetns

    if (arguments.length < 2) throw new Error('CrochetNode : not enough arguments')

    // context where the node will be registered (stitch)
    // do I even need it...?
    this._context = argContext

    if (argCoordinates instanceof Array) {
      if (argCoordinates.length < 2) throw new Error('CrochetNode : there must be two coordinatess in coordinates Array')
      if (typeof (argCoordinates[0]) !== 'number' || typeof (argCoordinates[1]) !== 'number') throw new Error('CrochetNode : both coordinates must be numbers')
      this.x = argCoordinates[0]
      this.y = argCoordinates[1]
    } else if (argCoordinates instanceof Vec2d) {
      this.x = argCoordinates.getArray()[0]
      this.y = argCoordinates.getArray()[1]
    } else {
      throw new Error('CrochetNode : coordinates must be an Array or Vec2d vector')
    }

    // by default nodes are not fixed in position
    this.fx = null
    this.fy = null

    // based on created links, we will keep tracck of nearest neighboring nodes on graph
    this._links = []

    // other references
    this.id = CrochetNode.COUNTER.next()
  }

  // *** PUBLIC METHODS ***

  // if a node is to be removed, it needs to:
  // - have all links removed (they self-unregister themselves from their start/end nodes)
  // - be un-registered form all contexts
  apoptose () {
    this._links.splice(0)
    this._context = undefined
  }

  getContext () { return this._context }

  // overrides the default .toString()
  toString () {
    return `[${this.id} (${this.type}) : ${this.y.toFixed(1)}; ${this.x.toFixed(1)}]`
  }

  // Returns the (x,y) position of the node as a Vector object
  getVector () {
    return new Vec2d(this.x, this.y)
  };

  setVector (v) {
    if (v instanceof Vec2d) { [this.x, this.y] = v.getArray() }
    return this
  }

  // Add a new link to the reference list of all links this node is connected by
  registerNeighbor (newLink) {
    if (this !== newLink.source && this !== newLink.target) return false
    this._links.push(newLink)
    return this
  }

  // Removes an existing link from the reference list
  unRegisterNeighbor (oldLink) {
    var pos = this._links.indexOf(oldLink)
    if (pos > -1) this._links.splice(pos, 1)
    return this
  }

  // returns all links associated with this node, filtered by link type and direction
  // possible call arguments: linkType, linkDir
  getNeighborLinks (dir = '', type = '') {
    // where the temp results will be stored
    var links = []

    // The filtering link direction must be either empty, "IN" or "OUT"
    if (dir !== '' && dir !== 'in' && dir !== 'out') throw new Error('crochetNode.getNeighborLinks: invalid direction')

    // Get the required links
    links = this._links.filter(
      (link) => (
        (type === '' || link.type === type) &&
        (
          dir === '' ||
          (dir === 'in' && this === link.target) ||
          (dir === 'out' && this === link.source)
        )
      )
    )

    return links
  }

  // Returns all neighbor nodes of this node, filtered by node type and direction of their link
  getNeighborNodes (dir = '', type = '') {
    // where the temp results will be stored
    var nodes = []

    // The filtering link direction must be either empty, "IN" or "OUT"
    if (dir !== '' && dir !== 'in' && dir !== 'out') throw new Error('crochetNode.getNeighborNodes: invalid direction')

    nodes = this._links.filter(
      (link) => (
        (
          this === link.source &&
          (dir === '' || dir === 'out') &&
          (type === '' || type === link.target.type)
        ) || (
          this === link.target &&
          (dir === '' || dir === 'in') &&
          (type === '' || type === link.source.type)
        )
      )
    ).map(
      link => ((link.target === this) ? link.source : link.target)
    )

    return nodes
  }

  getNeighborCount () {
    return this._links.length
  }

  getArray () { return [this.x, this.y] }
}

export default CrochetNode
