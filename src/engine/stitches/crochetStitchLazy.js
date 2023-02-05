import CrochetStitch from "./crochetStitch.js";

class CrochetStitchLazy extends CrochetStitch {
  // these stitches don't advance the "getNextLoop" by default
  get isLazyNexLoop() {
    return true;
  }
}

export default CrochetStitchLazy;
