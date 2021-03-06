import FactoryClass from '../factory.js'

function factoryDemo (log) {
  class n {static getType () { return 'x' }}
  const x = new FactoryClass(n, 'getType')

  class n1 {static getType () { return 'a' }}

  x.registerClass(n1)
  log(x.getClass('a').name)
  log(x.getNewObject('a').constructor.name)
  log(x.getClass('a').name)

  class n2 {static getType () { return 'b' }}
  class n3 {static getType () { return 'a' }}

  x.registerClass(n2)
  x.registerClass(n3)

  log(x.getClass('a').name)
  log(x.getClass('b').name)

  class n4 {}
  try { x.registerClass(n4) } catch (e) { log(e) }

  try {
    log(x.getClass('c').name)
  } catch (e) { log(e) }
}

export default factoryDemo
