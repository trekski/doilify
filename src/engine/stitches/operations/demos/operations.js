import OperationSubject from '../operationSubject.js'
import crochetOperationFactory from '../operationFactory.js'
import crochetNodeFactory from '../../../nodes/nodeFactory.js'
import crochetLinkFactory from '../../../links/linkFactory.js'

function crochetOperationDemo (log) {
  const st = 's'

  log('make default')

  let sub = new OperationSubject([], st, [])

  let x = crochetOperationFactory.getNewObject('default', sub, [])
  let r = x.exec()
  log(r.newNode)

  log('make origin')

  x = crochetOperationFactory.getNewObject('makeorigin', sub, [])
  r = x.exec()
  log(`${r.newNode.getType()} : ${r.newNode.id}`)

  const n1 = r.subject.needleStack[0]

  log('make simple')

  sub = r.subject

  x = crochetOperationFactory.getNewObject('mk', sub, ['external', 'struct'])
  r = x.exec()
  log(`new node : ${r.newNode.getType()} : ${r.newNode.id}`)
  log(`new link : ${r.newLink.getType()} : ${r.newLink.id}`)
  log(`del node : ${x.delNode}`)
  log(`del link: ${x.delLink}`)
  log(`subject : ${x.subject}`)

  const n2 = r.subject.needleStack[0]

  log('copy from needle ')

  sub = new OperationSubject([n1], st, [n2])
  log('before')
  log('needle: ' + sub.needleStack.map(e => e.id))
  log('other: ' + sub.otherLoops.map(e => e.id))
  let z1 = crochetOperationFactory.getNewObject('cp', sub, ['needle']).exec()
  log('after')
  log('needle: ' + z1.subject.needleStack.map(e => e.id))
  log('other: ' + z1.subject.otherLoops.map(e => e.id))

  log('copy to needle ')

  sub = new OperationSubject([n1], st, [n2])
  log('before')
  log('needle: ' + sub.needleStack.map(e => e.id))
  log('other: ' + sub.otherLoops.map(e => e.id))
  z1 = crochetOperationFactory.getNewObject('cp', sub, ['other']).exec()
  log('after')
  log('needle: ' + z1.subject.needleStack.map(e => e.id))
  log('other: ' + z1.subject.otherLoops.map(e => e.id))

  log('move from needle ')

  sub = new OperationSubject([n1], st, [n2])
  log('before')
  log('needle: ' + sub.needleStack.map(e => e.id))
  log('other: ' + sub.otherLoops.map(e => e.id))
  z1 = crochetOperationFactory.getNewObject('mv', sub, ['needle']).exec()
  log('after')
  log('needle: ' + z1.subject.needleStack.map(e => e.id))
  log('other: ' + z1.subject.otherLoops.map(e => e.id))

  log('move to needle ')

  sub = new OperationSubject([n1], st, [n2])
  log('before')
  log('needle: ' + sub.needleStack.map(e => e.id))
  log('other: ' + sub.otherLoops.map(e => e.id))
  z1 = crochetOperationFactory.getNewObject('mv', sub, ['other']).exec()
  log('after')
  log('needle: ' + z1.subject.needleStack.map(e => e.id))
  log('other: ' + z1.subject.otherLoops.map(e => e.id))

  const s = crochetNodeFactory.getNewObject('origin', 'A', [0, 0])
  const s1 = crochetNodeFactory.getNewObject('origin', 'A', [10, 0])
  const s2 = crochetNodeFactory.getNewObject('origin', 'A', [0, 10])
  const s3 = crochetNodeFactory.getNewObject('origin', 'A', [10, 10])

  const t = crochetNodeFactory.getNewObject('origin', 'A', [-10, -10])
  const t1 = crochetNodeFactory.getNewObject('origin', 'A', [-10, -20])
  const t2 = crochetNodeFactory.getNewObject('origin', 'A', [-20, -10])

  const ls1 = crochetLinkFactory.getNewObject('sequence', 'A', s, s1)
  const ls2 = crochetLinkFactory.getNewObject('sequence', 'A', s, s2)
  const ls3 = crochetLinkFactory.getNewObject('sequence', 'A', s, s3)

  const lt1 = crochetLinkFactory.getNewObject('sequence', 'A', t, t1)
  const lt2 = crochetLinkFactory.getNewObject('sequence', 'A', t, t2)
  const lt3 = crochetLinkFactory.getNewObject('sequence', 'A', t, s3)

  const l = crochetLinkFactory.getNewObject('sequence', 'A', t, s)

  log`before merge`

  log(`source ${s.id} : ${s.getNeighborNodes().map(e => e.id)}`)
  log(`target ${t.id} : ${t.getNeighborNodes().map(e => e.id)}`)
  sub = new OperationSubject([s, t], st, [])
  x = crochetOperationFactory.getNewObject('merge', sub, ['left'])
  r = x.exec()

  log`after merge`

  log(`deleted node : ${r.delNode.id}`)
  log(`deleted link : ${r.delLink.id}`)
  log(`source ${s.id} : ${s.getNeighborNodes().map(e => e.id)}`)
  log(`target ${t.id} : ${t.getNeighborNodes().map(e => e.id)}`)

  log(ls1, ls2, ls3, lt1, lt2, lt3, l)
}

export default crochetOperationDemo
