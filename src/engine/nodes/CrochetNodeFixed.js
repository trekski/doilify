import CrochetNode from "./crochetNode.js";

class CrochetNodeFixed extends CrochetNode {
  constructor(...args) {
    super(...args);
    // origin is ALWAYS fixed
    this.fx = this.x;
    this.fy = this.y;
  }
}

export default CrochetNodeFixed;
