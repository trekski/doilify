import CrochetLink from './crochetLink.js'
import Vec2d from '../misc/vector.js'
import { Plotter, GraphCommand, TransformationTwoVector } from '../misc/graphics.js'

class CrochetDraw extends CrochetLink {
  // override crochetLink dfaults
  static getType () { return 'draw' }
  static getDeftLen () { return 10 }
  static getDesc () { return 'no-strength link used for drawing' }
  static isPrintable () { return true } // this means it can have its getPath() method used properly!
  strenght () { return 0 }

  // add more stuff, specifically needed for displaying
  static getPathDef () {
    return 'l:100,0%'
  }

  getPathDef () { return this.constructor.getPathDef() }

  static getColor () { return 'black' }
  getColor () { return this.constructor.getColor() }

    // what a valid path definition string looks like
    static commandRegEx = /[a-zA-Z_]+( *: *-?[0-9]+,-?[0-9]+(% *(-?[0-9]+,-?[0-9]+)?)?)+$/

    // given a path definition, transform it into an array of two-vectors used for drawing
    static tokenizeDrawingCommands (pathStr = '') {
      // transform path definition string to an array of single commands
      let commands = pathStr
        .split(';') // str -> array
        .map(e => e.trim()) // remove extra spaces
        .filter(e => e !== '') // remove empty commands

      if (commands.length === 0) return []

      // remove invalidly formatted commands
      commands = commands.filter(c => (c.match(CrochetDraw.commandRegEx) !== null))

      // translate command string into tokenized command parameters
      const tokenized = commands
        .map(token => {
          const res = {}; // the ; is critical here
          [res.cmd, ...res.params] = token.split(':').map(e => e.trim()) // the ; is critical here
          return res // the ; is critical here
        })
        .filter(e => Plotter.allowedCommands.has(e.cmd)) // valid command name
        .filter(e => (Plotter.allowedCommands.get(e.cmd).numPts <= e.params.length)) // with enough param points
      return tokenized
    }

    static parseDrawingCmds (tokenizedCommands = []) {
      // convert each of the parameters into a two-vector
      // first vector is %-translaton (p,p)
      // second the abs-translation (a,a)
      const parsedCmds = tokenizedCommands
        .map(token => {
          const paramTwoVectors = token.params
            .map(param => { // "a,a" | "p,p%" | "p,p % a,a"
              param = '%' + param // "%a,a" | "%p,p%" "| "%p,p % a,a"

              const twoVecArray = param
                .split('%')
                .map(e => e.trim()) // [ "", "a,a"] | ["", "p,p". ""] | ["", "p,p", "a,a"]
                .reverse() // ["a,a", ""] | ["", "p,p". ""] | ["a,a", "p,p", ""]
                .slice(0, 2) // ["a,a", ""] | ["", "p,p"] | ["a,a", "p,p"]
                .map(f => (f === '' ? '0,0' : f)) // ["a,a", "0,0"] | ["0,0", "p,p"] | ["a,a", "p,p"]
                .map(g => g
                  .split(',')
                  .map(h => parseFloat(h))
                ) // [[ax,ay],[px,py]] etc..
                .map(i => new Vec2d(i)) // [[Vec2d],[Vec2d])

              // %-vector is given in perc.pts., so...
              twoVecArray[1] = twoVecArray[1].scale(0.01)

              return new TransformationTwoVector(twoVecArray) // { vAbs: [Vec2d], vPerc: [Vec2d] }
            })

          // new token
          return new GraphCommand(token.cmd, paramTwoVectors)
        })

      return parsedCmds
    }

    constructor () {
      super(...arguments)
      this.setNewPath()
    }

    setNewPath (p = '') {
      const pahtDefString = (p === '') ? this.getPathDef() : p
      const pathCmds = this.constructor.tokenizeDrawingCommands(pahtDefString)
      this.pathDefVectors = this.constructor.parseDrawingCmds(pathCmds)
    }
}

export default CrochetDraw
