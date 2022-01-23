import FactoryClass from '../misc/factory.js'

import CrochetStitch from './crochetStitch.js'
const CrochetStitchFactory = new FactoryClass(CrochetStitch, false, 4)

CrochetStitchFactory
  .registerClass(CrochetStitch, 'default', ['default', true, 0, 'mk:default:default'])
  .registerClass(CrochetStitch, 'origin', ['origin', false, 0, 'makeorigin'])
  .registerClass(CrochetStitch, 'ch', ['ch', true, 0, 'mk:external:start; mk:draw:finish:5:ch'])
  .registerClass(CrochetStitch, 'sc', ['sc', true, 1, 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:draw:loop:5:sc; merge:right'])
  .registerClass(CrochetStitch, 'dc', ['dc', true, 1, 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; mk:draw:loop:15:dc; merge:right'])
  .registerClass(CrochetStitch, 'slst', ['slst', true, 1, 'mk:external:start; mk:sequence:finish; mv:other; mk:external:hook; merge:right'])

export default CrochetStitchFactory
