import FactoryClass from '../../misc/factory.js'
import CrochetOperation from './crochetOperation.js'

import CrochetOperationMakeOrigin from './crochetOperationMakeOrigin.js'
import CrochetOperationBasic from './crochetOperationBasic.js'
import CrochetOperationCopy from './crochetOperationCopy.js'
import CrochetOperationMove from './crochetOperationMove.js'
import CrochetOperationMerge from './crochetOperationMerge.js'

const crochetOperationFactory = new FactoryClass(CrochetOperation, 'getCommandName')

crochetOperationFactory
  .registerClass(CrochetOperationMakeOrigin)
  .registerClass(CrochetOperationBasic)
  .registerClass(CrochetOperationCopy)
  .registerClass(CrochetOperationMove)
  .registerClass(CrochetOperationMerge)

export default crochetOperationFactory
