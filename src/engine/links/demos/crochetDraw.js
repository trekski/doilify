import CrochetDraw from '../crochetDraw.js'

function crochetDrawDemo (log) {
  let n1 = {x : 1, y : 2, registerNeighbor: ()=>{}}
  let n2 = {x : -1, y : 3, registerNeighbor: ()=>{}}
  let n3 = {x : -5, y : -5, registerNeighbor: ()=>{}}

  let l = new crochetDraw("A", n1, n2)
  log(l.getPathDef())
  l.pathDefVectors.forEach((command, i) => {
      log(`cmd : ${command.cmd}`);
      command.params.forEach((twovector, j) => {
          log(` - ${twovector.vPerc.scale(100)} % ${twovector.vAbs} u`)
      });
  });
}

export default crochetDrawDemo
