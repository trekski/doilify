import Vec2d from '../vector.js'

function vectorDemo (log) {
  const v1 = new Vec2d(0, 1)
  const v2 = new Vec2d(2, 0)
  log(`v1 : ${v1}`)
  log(`v2 : ${v2}`)
  const v3 = v1.add(v2)
  log(`v1 as array : ${v1.getArray()}`)
  log(`v1 + v2 : ${v3}`)
}

export default vectorDemo
