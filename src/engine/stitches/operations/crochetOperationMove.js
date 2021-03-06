import CrochetOperation from './crochetOperation.js'
// import Vec2d from '../../misc/vector.js'

class CrochetOperationMove extends CrochetOperation {
  static getCommandName () { return 'mv' }

  exec () {
    const cmd = this.params[0]
    const newSubject = this.subject.copy()

    if (cmd === 'needle') {
      newSubject.otherLoops.push(newSubject.needleStack.pop())
    } else if (cmd === 'other') {
      newSubject.needleStack.push(newSubject.otherLoops.pop())
    } else {
      throw new Error(`crochetOperationMove : Expected parameter to be 'needle' or 'other', got '${cmd}'`)
    }

    const res = this.getBasicResult(newSubject)
    return res
  }
}

export default CrochetOperationMove
