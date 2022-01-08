import CrochetDraw from './crochetDraw.js'

class DrawSC extends CrochetDraw {
  // override crochetLink dfaults
  get type () { return 'draw_hdc' }
  get desc () { return 'single crochet cross' }
  get pathDef () {
    return 'M:100,0%0,4;' +
      'l:0,-8;' +
      'm:0,4;' +
      'l:-100,0%4,0'
  }
}

export default DrawSC
