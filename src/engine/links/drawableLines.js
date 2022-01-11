class DrawableLines {
  static DEFS = new Map([
    [
      'default',
      'l:100,0%'
    ],
    [
      'ch',
      'm:100,0%-4,0;' +
        'a:4,4:1,0:1,1:8,0;' +
        'a:4,4:1,0:1,1:-8,0;'
    ],
    [
      'sc',
      'M:100,0%0,4;' +
        'l:-8,-8;' +
        'm:8,0;' +
        'l:-8,8;'
    ],
    [
      'hdc',
      'M:100,0%0,4;' +
        'l:0,-8;' +
        'm:0,4;' +
        'l:-100,0%4,0'
    ],
    [
      'dc',
      'M:100,0%0,4;' +
        'l:0,-8;' +
        'm:0,4;' +
        'l:-100,0%4,0;' +
        'M:50,0%3,-3;' +
        'l:-6,6'
    ],
    [
      'trc',
      'M:100,0%0,4;' +
        'l:0,-8;' +
        'm:0,4;' +
        'l:-100,0%4,0'
    ]
  ])

  static getLineDef (key) {
    return this.DEFS.get(key)
  }
}

export default DrawableLines
