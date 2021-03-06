import Vec2d from './vector.js'

// *** these classes are jsut to make sure that the objects we parse are of proper format ***

class TransformationTwoVector {
  constructor () {
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
  }

  // given base parameters and two-vector parameter, returns the actual point to draw
  calcPathPoint (base = new Vec2d(1, 0)) {
    const v = this.vAbs.rot(base.basePhi)
    const u = this.vPerc.scale(base.baseLen).rot(base.basePhi)
    return v.add(u)
  }
}

class GraphCommand {
  constructor (cmd, params) {
    if (typeof (cmd) !== 'string') throw new Error('graphCommand : command must be a string')
    if (!(params instanceof Array)) throw new Error('graphCommand : params must be an Array of TransformationTwoVector')
    params = params.filter(e => (e instanceof TransformationTwoVector))
    this.cmd = cmd
    this.params = params
  }
}

class Plotter {
  // *** some elementary geometry ***
  // resets frame of reference for the link
  // i.e. it's base vectors used in drawing path calculation
  static getBase (from, to) {
    const start = from
    const v = to.sub(start)
    // calc base vectors
    let basePhi = v.phi()
    if (isNaN(basePhi)) basePhi = 0
    let baseLen = v.len()
    if (baseLen < 1) baseLen = 1
    return { baseOrigin: start, baseLen: baseLen, basePhi: basePhi }
  }

  // *** primitive SVG path (attr. d) command generators ****

  // generates SVG path to move pen to links Source point
  static SVGpathResetPen (base) {
    return 'M ' + base.baseOrigin.getTxt()
  }

  // generate typical SVG command from several (Vec2d) points
  static SVGpathGeneric (cmd, numPts, vecArr) {
    if (vecArr.filter(e => (e instanceof Vec2d)).length < numPts) {
      throw new Error(`getSVGcmd : not enough vectors in veec2Arr for command '${cmd}'. Expected ${numPts}`)
    }
    const dPoints = vecArr
      .slice(0, numPts)
      .filter(e => (e instanceof Vec2d))
      .map(e => e.getTxt())
      .join(' ')
    return `${cmd} ${dPoints}`
  }

  static SVGpathArc (vecArr, base) {
    if (vecArr.filter(e => (e instanceof Vec2d)).length < 4) {
      throw new Error('getSVGcmd : not enough vectors in vecArr for command \'a\'. Expected 4')
    }
    let dCmd = 'a '
    dCmd += vecArr[0].rot(-base.basePhi).getTxt() + ' ' // arc radii
    dCmd += (-vecArr[1].phi() / Math.PI * 180) + ' ' // arc major axis rotation
    dCmd += vecArr[2]._x + ' ' + vecArr[2]._y + ' ' // arc draw flags
    dCmd += vecArr[3].getTxt() // arc end
    return dCmd
  }

  static SVGpathCommandFactory (func, cmd, numPts, base, vecArr) {
    switch (func) {
      case 'reset' : return Plotter.SVGpathResetPen(base)
      case 'arc' : return Plotter.SVGpathArc(vecArr, base)
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
    ['T', { numPts: 3, mappedCmd: 't', funcs: ['reset', 'generic'] }],
    ['t', { numPts: 3, mappedCmd: 'l', funcs: ['generic'] }],
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
    const base = Plotter.getBase(sourceVec, targetVec)
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
          mappedCmd,
          numPts,
          base,
          vectors
        )
      )
      return pathStepParts.join(' ')
    })
    path += ' ' + pathSteps.join(' ')
    return path
  }
}

export { TransformationTwoVector, GraphCommand, Plotter }
