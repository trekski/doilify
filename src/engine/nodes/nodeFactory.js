import FactoryClass from '../misc/factory.js'
import CrochetNode from './crochetNode.js'

// console.log(typeof CrochetNode.prototype['type'])

import CrochetNodeOrigin from './crochetNodeOrigin.js'
// import CrochetNodeStart from './crochetNodeStart.js'
// import CrochetNodeFinish from './crochetNodeFinish.js'
// import CrochetNodeHook from './crochetNodeHook.js'
// import CrochetNodeLoop from './crochetNodeLoop.js'
// import CrochetNodeStruct from './crochetNodeStruct.js'
// import CrochetNodeCHSpaceStart from './crochetNodeCHSpaceStart.js'
// import CrochetNodeCHSpaceCont from './crochetNodeCHSpaceCont.js'

const crochetNodeFactory = new FactoryClass(CrochetNode)
crochetNodeFactory
  .registerClass(CrochetNode, 'default', ['default', false, 'black'])
  // .registerClass(CrochetNodeOrigin)
  .registerClass(CrochetNodeOrigin, 'origin', ['origin', true, 'black'])
  // .registerClass(CrochetNodeStart)
  .registerClass(CrochetNode, 'start', ['start', false, 'green'])
  // .registerClass(CrochetNodeFinish)
  .registerClass(CrochetNode, 'finish', ['finish', true, 'green'])
  // .registerClass(CrochetNodeHook)
  .registerClass(CrochetNode, 'hook', ['hook', false, 'brown'])
  // .registerClass(CrochetNodeLoop)
  .registerClass(CrochetNode, 'loop', ['loop', true, 'blue'])
  // .registerClass(CrochetNodeStruct)
  .registerClass(CrochetNode, 'struct', ['struct', true, 'darkgray'])
  // .registerClass(CrochetNodeCHSpaceStart)
  .registerClass(CrochetNode, 'ch_sp_start', ['ch_sp_start', true, 'yellow'])
  // .registerClass(CrochetNodeCHSpaceCont)
  .registerClass(CrochetNode, 'ch_sp_cont', ['ch_sp_cont', true, 'violet'])

export default crochetNodeFactory
