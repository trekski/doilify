import CrochetLink from './crochetLink.js'

class CrochetLinkSequential extends CrochetLink {
  get type () { return 'sequence' }
  get defLen () { return 10 }
  get desc () { return 'connects nodes from the main sequence' }
  get color () { return '#333' }
}

export default CrochetLinkSequential
