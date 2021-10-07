import crochetStitchFactory from '../stitchFactory.js'
import crochetNodeFactory from '../../nodes/nodeFactory.js'

function crochetStitchDemo (log) {
  let s, n, n2

  n = crochetNodeFactory.getNewObject('start', 'stitch', [0, 0])
  n = crochetNodeFactory.getNewObject('start', 'stitch', [0, 0])
  s = crochetStitchFactory.getNewObject('default', 'doily', n)
  log`*** default stitch ***`
  log(`${s.id}`)
  log(`${s.getSequence()}`)
  log(`nodes : ${s.getNodes()}`)
  log(`links : ${s.getLinks()}`)
  log(`start : ${s.getStartNode()}`)
  log(`end : ${s.getEndNode()}`)

  log`*** origin stitch ***`

  s = crochetStitchFactory.getNewObject('origin', 'doily')
  log(`nodes : ${s.getNodes()}`)
  log(`links : ${s.getLinks()}`)

  log`*** chain stitch ***`

  n = s.getLastLoop()
  log(`${n._links}`)

  s = crochetStitchFactory.getNewObject('ch', 'doily', n)

  log(`nodes : ${s.getNodes()}`)
  log(`links : ${s.getLinks()}`)
  log(`links : ${s.getLinks().map(e => (e.source.id + ' -> ' + e.target.id + '(' + e.getType() + ')'))}`)

  n2 = s.getStartNode()
  log(`start : ${n2.getType()} ${n2.id}`)
  n2 = s.getEndNode()
  log(`end : ${n2.getType()} ${n2.id}`)
  n2 = s.getFirstLoop()
  log(`first loop : ${n2.getType()} ${n2.id}`)
  n2 = s.getLastLoop()
  log(`last loop : ${n2.getType()} ${n2.id}`)

  log('*** single crochet  ***')

  s = crochetStitchFactory.getNewObject('sc', 'doily', n2, [n])
  log(`nodes : ${s.getNodes()}`)
  log('links :')
  s.getLinks().forEach(e => (
    log(`    ${e.id} (${e.getType()}) : ${e.source.id} -> ${e.target.id}`)
  ))

  log('*** double crochet  ***')

  s = crochetStitchFactory.getNewObject('dc', 'doily', n2, [n])
  log(`nodes : ${s.getNodes()}`)
  log('links :')
  s.getLinks().forEach(e => (
    log(`    ${e.id} (${e.getType()}) : ${e.source.id} -> ${e.target.id}`)
  ))

  log('*** slip stitch  ***')

  s = crochetStitchFactory.getNewObject('slst', 'doily', n2, [n])
  log(`nodes : ${s.getNodes()}`)
  log('links :')
  s.getLinks().forEach(e => (
    log(`    ${e.id} (${e.getType()}) : ${e.source.id} -> ${e.target.id}`)
  ))
}

export default crochetStitchDemo
