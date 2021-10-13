import CrochetOperation from './crochetOperation.js'

class CrochetOperationCopy extends CrochetOperation {
  get commandName () { return 'cp' }

  exec () {
    const cmd = this.params[0]
    if (cmd !== 'needle' && cmd !== 'other') throw new Error(`crochetOperationCopy : Expected parameter to be 'needle' or 'other', got '${cmd}'`)

    const newSubject = this.subject.copy()
    const tmp = (
      cmd === 'needle'
        ? newSubject.needleStack.pop()
        : newSubject.otherLoops.pop()
    )

    newSubject.otherLoops.push(tmp)
    newSubject.needleStack.push(tmp)
    return this.getBasicResult(newSubject)
  }
}

export default CrochetOperationCopy
