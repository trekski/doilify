import FactoryClass from '../misc/factory.js'
import CrochetNode from './crochetNode.js'

import CrochetNodeOrigin from './crochetNodeOrigin.js'
import CrochetNodeStart from './crochetNodeStart.js'
import CrochetNodeFinish from './crochetNodeFinish.js'
import CrochetNodeHook from './crochetNodeHook.js'
import CrochetNodeLoop from './crochetNodeLoop.js'
import CrochetNodeStruct from './crochetNodeStruct.js'
import CrochetNodeCHSpaceStart from './crochetNodeCHSpaceStart.js'
import CrochetNodeCHSpaceCont from './crochetNodeCHSpaceCont.js'

const crochetNodeFactory = new FactoryClass(CrochetNode, 'getType')

crochetNodeFactory
  .registerClass(CrochetNodeOrigin)
  .registerClass(CrochetNodeStart)
  .registerClass(CrochetNodeFinish)
  .registerClass(CrochetNodeHook)
  .registerClass(CrochetNodeLoop)
  .registerClass(CrochetNodeStruct)
  .registerClass(CrochetNodeCHSpaceStart)
  .registerClass(CrochetNodeCHSpaceCont)

export default crochetNodeFactory
