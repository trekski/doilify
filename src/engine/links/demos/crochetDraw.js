import DrawableLines from '../drawableLines.js'
import CrochetDraw from '../crochetDraw.js'
// import DrawCH from '../drawCH.js'
// import DrawSC from '../drawSC.js'
// import DrawHDC from '../drawHDC.js'
// import DrawDC from '../drawDC.js'
// import DrawTRC from '../drawTRC.js'

function crochetDrawDemo (log) {
  var line = DrawableLines.getLineDef('default')
  log(line)

  const n1 = { x: 1, y: 2, registerNeighbor: () => {} }
  const n2 = { x: -1, y: 3, registerNeighbor: () => {} }

  const link = new CrochetDraw(undefined, undefined, undefined, undefined, 'A', n1, n2)

  link.setNewPath(line)

  function drawsim (link) {
    link.pathCommands.forEach((command, i) => {
      log(`cmd : ${command.cmd}`)
      command.params.forEach((twovector, j) => {
        log(` - ${twovector.vPerc.scale(100)} % ${twovector.vAbs} u`)
      })
    })
  }

  drawsim(link)

  log('CH')
  line = DrawableLines.getLineDef('ch')
  link.setNewPath(line)
  drawsim(link)

  log('SC')
  line = DrawableLines.getLineDef('sc')
  link.setNewPath(line)
  drawsim(link)

  log('HDC')
  line = DrawableLines.getLineDef('hdc')
  link.setNewPath(line)
  drawsim(link)

  log('DC')
  line = DrawableLines.getLineDef('dc')
  link.setNewPath(line)
  drawsim(link)

  log('TRC')
  line = DrawableLines.getLineDef('trc')
  link.setNewPath(line)
  drawsim(link)
}

export default crochetDrawDemo
