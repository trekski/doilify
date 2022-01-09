import CrochetDraw from './crochetDraw.js'

class DrawDC extends CrochetDraw {
  // override crochetLink dfaults
  get type () { return 'draw_dc' }
  get desc () { return 'double crochet Tee /w slash' }
  get pathDef () {
    return 'M:100,0%0,4;' +
      'l:0,-8;' +
      'm:0,4;' +
      'l:-100,0%4,0;' +
      'M:50,0%3,-3;' +
      'l:-6,6'
  }
}

export default DrawDC
