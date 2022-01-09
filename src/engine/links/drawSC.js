import CrochetDraw from './crochetDraw.js'

class DrawSC extends CrochetDraw {
  // override crochetLink dfaults
  get type () { return 'draw_sc' }
  get desc () { return 'single crochet cross' }
  get pathDef () {
    return 'M:100,0%0,4;' +
    'l:-8,-8;' +
    'm:8,0;' +
    'l:-8,8;'
  }
}

export default DrawSC
