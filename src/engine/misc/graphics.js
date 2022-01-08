import Vec2d from './vector.js'

// *** these classes are just to make sure that the objects we parse are of proper format ***

// just a convenience object : isntead of keeping 2 vectors all the time, reduce them to what is important.
class PlotBaseVector {
  constructor (from = new Vec2d(0, 0), to = new Vec2d(1, 0)) {
    const v = to.sub(from)
    // calc base vectors
    let basePhi = v.phi()
    if (isNaN(basePhi)) basePhi = 0
    let baseLen = v.len()
    if (baseLen < 1) baseLen = 1
    this.origin = new Vec2d(from.getArray()) // to make a copy
    this.len = baseLen
    this.phi = basePhi
    // console.log([this.origin._x, this.origin._y, this.len, this.phi])
  }
}

class TransformationTwoVector {
  constructor () {
    // we require either two arguments of class Vec2d
    // or one argument which is an Array of Vec2d's with two elements
    var args = Array.prototype.slice.call(arguments)
    let clean = []
    if (args.length === 1 && args[0] instanceof Array && args[0].length > 1) {
      clean = args[0]
    }
    if (arguments.length > 1) {
      clean = args
    }
    clean = clean.filter(e => (e instanceof Vec2d))
    if (clean.length < 2) throw new Error('TransformationTwoVector : not enough vectors')
    this.vAbs = clean[0]
    this.vPerc = clean[1]
    // console.log(this.vPerc)
  }

  // given base vector (axis along which we draw) and two-vector parameter, returns the actual point to draw
  calcPathPoint (base = new PlotBaseVector()) {
    const v = this.vAbs.rot(base.phi)
    const u = this.vPerc.scale(base.len).rot(base.phi)
    // console.log(u)
    return v.add(u)
  }
}

class GraphCommand {
  // we need one command (to kwno what SVG path element will be drawn)
  // and an array of transform. two-vectors (to know the SVG control points)
  constructor (cmd, params) {
    if (typeof (cmd) !== 'string') throw new Error('graphCommand : command must be a string')
    if (!(params instanceof Array)) throw new Error('graphCommand : params must be an Array of TransformationTwoVector')
    params = params.filter(e => (e instanceof TransformationTwoVector))
    this.cmd = cmd
    this.params = params
  }
}

// given a path definition (string), transform it into an array of two-vectors used for drawing
function tokenizeDrawingCommands (pathStr = '') {
  // what a valid path definition string looks like
  const f = '-?([0-9]+\\.)?[0-9]+' // floating point number
  const commandRegEx = new RegExp(`[a-zA-Z_]+( *: *${f},${f}(% *(${f},${f})?)?)+$`)

  // transform path definition string to an array of tokens
  // each token is an array sonsisting of: one stirng for command name,
  // and arbitrarily manys strigns representing the Transformation vectors
  let commands = pathStr
    .split(';') // str -> array
    .map(e => e.trim()) // remove extra spaces
    .filter(e => e !== '') // remove empty commands
  if (commands.length === 0) return []

  // remove invalidly formatted commands
  commands = commands.filter(c => (c.match(commandRegEx) !== null))

  // translate command string into tokenized command parameters
  const tokenized = commands
    .map(token => {
      const res = {}; // the ; is critical here
      [res.cmd, ...res.params] = token.split(':').map(e => e.trim())
      return res
    })
    .filter(e => Plotter.allowedCommands.has(e.cmd)) // valid command name
    .filter(e => (Plotter.allowedCommands.get(e.cmd).numPts <= e.params.length)) // with enough param points
  return tokenized
}

function parseDrawingCmds (tokenizedCommands = []) {
  // convert each of the parameters into a two-vector
  // first vector is %-translaton (p,p)
  // second the abs-translation (a,a)
  const parsedCmds = tokenizedCommands
    .map(token => {
      const paramTwoVectors = token.params
        .map(param => { // "a,a" | "p,p%" | "p,p % a,a"
          param = '%' + param // "%a,a" | "%p,p%" | "%p,p % a,a"

          const twoVecArray = param
            .split('%')
            .map(e => e.trim()) // [ "", "a,a"] | ["", "p,p", ""] | ["", "p,p", "a,a"]
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

// cahce pahts taht we already know - we don't need to tokenize and parse them again
class PathLookupReigstry {
  static knownPaths = new Map()
  static getParsedPath (pathString) {
    if (!this.knownPaths.has(pathString)) {
      const parserdPath = parseDrawingCmds(tokenizeDrawingCommands(pathString))
      this.knownPaths.set(pathString, parserdPath)
    }
    return this.knownPaths.get(pathString)
  }
}

class Plotter {
  // *** primitive SVG path (attr. d) command generators ****

  // draw resolution: how precis ewe wanthte SVG path points to be
  static D_RES = 2

  // generates SVG path to move pen to links Source point
  static SVGpathResetPen (base) {
    return 'M ' + base.origin.getTxt(this.D_RES)
  }

  // generate typical SVG command from several (Vec2d) points
  static SVGpathGeneric (cmd, numPts, vecArr) {
    if (vecArr.filter(e => (e instanceof Vec2d)).length < numPts) {
      throw new Error(`getSVGcmd : not enough vectors in veec2Arr for command '${cmd}'. Expected ${numPts}`)
    }
    const dPoints = vecArr
      .slice(0, numPts)
      .filter(e => (e instanceof Vec2d))
      .map(e => e.getTxt(this.D_RES))
      .join(' ')
    return `${cmd} ${dPoints}`
  }

  static SVGpathArc (vecArr, base, params) {
    if (vecArr.filter(e => (e instanceof Vec2d)).length < 4) {
      throw new Error('getSVGcmd : not enough vectors in vecArr for command \'a\'. Expected 4')
    }
    let dCmd = 'a '
    dCmd += vecArr[0].rot(-base.phi).getTxt(this.D_RES) + ' ' // arc radii
    dCmd += (-vecArr[1].phi() / Math.PI * 180).toFixed(this.D_RES) + ' ' // arc major axis rotation
    // dCmd += vecArr[2]._x + ' ' + vecArr[2]._y + ' ' // arc draw flags
    dCmd += params[2].vAbs._x + ',' + params[2].vAbs._y + ','
    dCmd += vecArr[3].getTxt(this.D_RES) // arc end
    return dCmd
  }

  static SVGpathCommandFactory (func, cmd, params, numPts, base, vecArr) {
    switch (func) {
      case 'reset' : return Plotter.SVGpathResetPen(base)
      case 'arc' : return Plotter.SVGpathArc(vecArr, base, params)
      case 'generic' : return Plotter.SVGpathGeneric(cmd, numPts, vecArr)
      default : return ''
    }
  }

  // allowed commands (and their setup) that can be translated into 'd' attribute for SVG path
  // numPts: how many twoVectors are needed
  // mapped : what the rendered command (might) be
  // funcs : which functions should convert twoVectors to SVG 'd' commands
  static allowedCommands = new Map([
    ['M', { numPts: 1, mappedCmd: 'm', funcs: ['reset', 'generic'] }],
    ['m', { numPts: 1, mappedCmd: 'm', funcs: ['generic'] }],
    ['L', { numPts: 1, mappedCmd: 'l', funcs: ['reset', 'generic'] }],
    ['l', { numPts: 1, mappedCmd: 'l', funcs: ['generic'] }],
    ['Q', { numPts: 3, mappedCmd: 'q', funcs: ['reset', 'generic'] }],
    ['q', { numPts: 3, mappedCmd: 'q', funcs: ['generic'] }],
    ['C', { numPts: 3, mappedCmd: 'c', funcs: ['reset', 'generic'] }],
    ['c', { numPts: 3, mappedCmd: 'c', funcs: ['generic'] }],
    ['a', { numPts: 4, mappedCmd: ' ', funcs: ['arc'] }]
  ])

  // *** combine everything together ***

  // having the tokenized path drawing commands and links start and end,
  // generate the applicable SVG path to be drawn
  static getPathTxt (sourceVec, targetVec, pathDef) {
    if (!(sourceVec instanceof Vec2d)) throw new Error('getPathTxt : sourceVec must be a Vec2d vector')
    if (!(targetVec instanceof Vec2d)) throw new Error('getPathTxt : targetVec must be a Vec2d vector')
    if (!(pathDef instanceof Array)) throw new Error('pathDef : targetVec must be an Array of [graphCommand]')
    pathDef = pathDef.filter(e => (e instanceof GraphCommand))

    // establish frame of reference
    const base = new PlotBaseVector(sourceVec, targetVec)
    // * parse the command *
    // start by moving to link source
    let path = Plotter.SVGpathResetPen(base)
    // parse each path command
    const pathSteps = pathDef.map(pathCommand => {
      const vectors = pathCommand.params.map(
        e => e.calcPathPoint(base)
      )
      const { numPts, mappedCmd, funcs } = Plotter.allowedCommands.get(pathCommand.cmd)
      const pathStepParts = funcs.map(
        e => Plotter.SVGpathCommandFactory(
          e,
          mappedCmd, // 'a'
          pathCommand.params,
          numPts, // 4
          base, // origin, len, phi
          vectors //
        )
      )
      return pathStepParts.join(' ')
    })
    path += ' ' + pathSteps.join(' ')
    return path
  }
}

export {
  PlotBaseVector,
  TransformationTwoVector,
  GraphCommand,
  Plotter,
  PathLookupReigstry,
  tokenizeDrawingCommands,
  parseDrawingCmds
}
