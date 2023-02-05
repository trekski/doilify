import OperationSubject from './operationSubject.js'
import crochetNodeFactory from '../../nodes/nodeFactory.js'
import crochetLinkFactory from '../../links/linkFactory.js'

class CrochetOperation {
  get commandName () { return 'default' }
  get minParams () { return 0 }
 
    static nodeFactory = crochetNodeFactory
    static linkFactory = crochetLinkFactory

    constructor (cmds) {
      if (!(cmds instanceof Array)) throw new Error('crochetOperation : params must be an array [string]')
      this.params = cmds.filter(e => (typeof e === 'string')) // first argument will be an Array of the operation parameters
      if (this.params.length < this.minParams) throw new Error(`crochetOperation : not enough parameters for '${this.commandName}'. Expected : ${this.minParams}`)
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

    exec (subject) {
      if (!(subject instanceof OperationSubject)) throw new Error('crochetOperation : needs a valid operationSubject')
      return this.getBasicResult(subject) // no new links or nodes were created or removed
    }
}

export default CrochetOperation
