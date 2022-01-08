import CrochetLink from './crochetLink.js'
import { PathLookupReigstry } from '../misc/graphics.js'

class CrochetDraw extends CrochetLink {
  // override crochetLink dfaults
  get type () { return 'draw' }
  get defLen () { return 10 }
  get desc () { return 'no-strength link used for drawing' }
  get isPrintable () { return true }
  // strenght () { return 0 }

  // add more stuff, specifically needed for displaying
  get pathDef () {
    return 'l:100,0%'
  }

  get color () { return 'black' }

  constructor () {
    super(...arguments)
    this.setNewPath()
  }

  setNewPath (p = '') {
    const pahtDefString = (p === '') ? this.pathDef : p
    this.pathCommands = PathLookupReigstry.getParsedPath(pahtDefString)
  }
}

export default CrochetDraw
