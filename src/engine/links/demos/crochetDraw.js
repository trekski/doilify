import CrochetDraw from '../crochetDraw.js'
import DrawCH from '../drawCH.js'
import DrawSC from '../drawSC.js'
import DrawHDC from '../drawHDC.js'
import DrawDC from '../drawDC.js'
import DrawTRC from '../drawTRC.js'

function crochetDrawDemo (log) {
  const n1 = { x: 1, y: 2, registerNeighbor: () => {} }
  const n2 = { x: -1, y: 3, registerNeighbor: () => {} }

  var l = new CrochetDraw('A', n1, n2)
  log(l.pathDef)

  l.pathDefVectors.forEach((command, i) => {
    log(`cmd : ${command.cmd}`)
    command.params.forEach((twovector, j) => {
      log(` - ${twovector.vPerc.scale(100)} % ${twovector.vAbs} u`)
      // console.log(`${twovector.calcPathPoint()}`)
    })
  })
  log('CH')
  log(DrawCH.prototype.pathDef)
  log('SC')
  log(DrawSC.prototype.pathDef)
  log('HDC')
  log(DrawHDC.prototype.pathDef)
  log('DC')
  log(DrawDC.prototype.pathDef)
  log('TRC')
  log(DrawTRC.prototype.pathDef)
}

export default crochetDrawDemo
