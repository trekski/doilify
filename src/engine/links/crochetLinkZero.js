import CrochetLink from './crochetLink.js'

class CrochetLinkZero extends CrochetLink {
  get type () { return 'zero' }
  get defLen () { return 0 }
  get desc () { return 'zero-lenght link' }
}

export default CrochetLinkZero
