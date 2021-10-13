import CrochetDraw from '../crochetDraw.js'

function crochetDrawDemo (log) {
  const n1 = { x: 1, y: 2, registerNeighbor: () => {} }
  const n2 = { x: -1, y: 3, registerNeighbor: () => {} }

  const l = new CrochetDraw('A', n1, n2)
  log(l.pathDef)
  l.pathDefVectors.forEach((command, i) => {
    log(`cmd : ${command.cmd}`)
    command.params.forEach((twovector, j) => {
      log(` - ${twovector.vPerc.scale(100)} % ${twovector.vAbs} u`)
    })
  })
}

export default crochetDrawDemo
