import OperationSubject from './operationSubject.js'
import crochetNodeFactory from '../../nodes/nodeFactory.js'
import crochetLinkFactory from '../../links/linkFactory.js'

class CrochetOperation {
  get commandName () { return 'default' }
  get minParams () { return 0 }

    static nodeFactory = crochetNodeFactory
    static linkFactory = crochetLinkFactory

    constructor (subject, cmds) {
      if (!(subject instanceof OperationSubject)) throw new Error('crochetOperation : needs a valid operationSubject')
      if (!(cmds instanceof Array)) throw new Error('crochetOperation : params must be an array [string]')
      this.params = cmds.filter(e => (typeof e === 'string')) // first argument will be an Array of the operation parameters
      if (this.params.length < this.minParams) throw new Error(`crochetOperation : not enough parameters for '${this.commandName}'. Expected : ${this.minParams}`)
      this.subject = subject // rest is the subject of the operation - components of the W.I.P. crochetStitch
      console.groupCollapsed('CrochetOperation > constructor')
      console.log('subject: ', subject)
      console.log('this.subject: ', this.subject)
      console.log('cmds: ', cmds)
      console.log('this.params:', this.params)
      console.groupEnd()
    }

    getBasicResult (newSubject, newNode = false, newLink = false, delNode = false, delLink = false) {
      return {
        subject: newSubject,
        newNode: newNode,
        newLink: newLink,
        delNode: delNode,
        delLink: delLink
      }
    }

    // just a small helper
    static getLinkDefLen (byLinkType) {
      return this.linkFactory.getClass(byLinkType).prototype.defLen
    }

    exec () {
      return this.getBasicResult(this.subject) // no new links or nodes were created or removed
    }
}

export default CrochetOperation
