import CrochetOperation from './crochetOperation.js'

class CrochetOperationMakeOrigin extends CrochetOperation {
  get commandName () { return 'makeorigin' }

  exec () {
    const newSubject = this.subject.copy()
    const newNode = CrochetOperation.nodeFactory.getNewObject(
      'origin',
      this.subject.contextStitch,
      [0, 0]
    )
    newSubject.needleStack.push(newNode)
    return this.getBasicResult(newSubject, newNode)
  }
}

export default CrochetOperationMakeOrigin
