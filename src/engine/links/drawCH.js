import CrochetDraw from './crochetDraw.js'

class DrawCH extends CrochetDraw {
  // override crochetLink dfaults
  get type () { return 'draw_ch' }
  get desc () { return 'circle to represent simple chain stitch' }
  get pathDef () {
    return 'm:100,0%-4,0;' +
      'a:4,4:1,0:1,1:8,0;' +
      'a:4,4:1,0:1,1:-8,0;'
  }
}

export default DrawCH
