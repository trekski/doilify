import CrochetDraw from './crochetDraw.js'

class DrawTRC extends CrochetDraw {
  // override crochetLink dfaults
  get type () { return 'draw_trc' }
  get desc () { return 'treble Tee /w double slash' }
  get pathDef () {
    return 'M:100,0%0,4;' +
      'l:0,-8;' +
      'm:0,4;' +
      'l:-100,0%4,0;' +
      'M:50,0%3,-3;' +
      'l:-6,6;' +
      'm:0,-6;' +
      'l:-6,6'
  }
}

export default DrawTRC
