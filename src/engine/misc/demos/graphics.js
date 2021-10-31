import { PlotBaseVector, Plotter, TransformationTwoVector, GraphCommand } from '../graphics.js'
// import { PlotBaseVector, Plotter, TransformationTwoVector } from '../graphics.js'
import Vec2d from '../vector.js'

function graphicsDemo (log) {
  let base = new PlotBaseVector(new Vec2d(1, 1), new Vec2d(-1, 1))
  log(base.origin)
  log(base.len)
  log(base.phi)

  base = new PlotBaseVector(new Vec2d(1, 1), new Vec2d(11, 1))
  const abs = new Vec2d(1, 5)
  const perc = new Vec2d(0.2, 0.3)
  log(abs)
  log(perc)
  const pt = new TransformationTwoVector(abs, perc).calcPathPoint(base)
  log(pt)

  log(Plotter.SVGpathResetPen(base))

  const v1 = new Vec2d(1, 1)
  const v2 = new Vec2d(2, 3)
  const v3 = new Vec2d(-5, 4)

  log(Plotter.SVGpathGeneric('c', 3, [v1, v2, v3]))

  const tv = new TransformationTwoVector([new Vec2d(1, 1), new Vec2d(11, 1)])
  log(tv.vAbs)

  const gc1 = new GraphCommand('l', [tv])
  log(`${gc1.cmd} : [${gc1.params.length}]`)

  const tv1 = new TransformationTwoVector(new Vec2d(1, 1), new Vec2d(0, 0))
  const tv2 = new TransformationTwoVector(new Vec2d(0, 0), new Vec2d(2, 3))
  const tv3 = new TransformationTwoVector(new Vec2d(-5, 4), new Vec2d(7, -8))

  const gc2 = new GraphCommand('M', [tv1])
  const gc3 = new GraphCommand('q', [tv1, tv2, tv3])
  const gc4 = new GraphCommand('a', [tv, tv1, tv2, tv3])

  const d = Plotter.getPathTxt(new Vec2d(1, 1), new Vec2d(-1, 1), [gc1, gc2, gc3, gc4])
  log(d)
}

export default graphicsDemo
