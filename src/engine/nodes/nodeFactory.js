import FactoryClass from "../misc/factory.js";

import CrochetNode from "./crochetNode.js";
import CrochetNodeFixed from "./CrochetNodeFixed.js";

const crochetNodeFactory = new FactoryClass(CrochetNode, false, 0);
crochetNodeFactory
  .registerClass(CrochetNode, "default", ["default", false, "black"])
  .registerClass(CrochetNodeFixed, "origin", ["origin", true, "black"])
  .registerClass(CrochetNode, "start", ["start", false, "green"])
  .registerClass(CrochetNode, "finish", ["finish", true, "green"])
  .registerClass(CrochetNode, "hook", ["hook", false, "brown"])
  .registerClass(CrochetNode, "loop", ["loop", true, "blue"])
  .registerClass(CrochetNode, "struct", ["struct", true, "darkgray"])
  .registerClass(CrochetNode, "ch_sp_start", ["ch_sp_start", true, "yellow"])
  .registerClass(CrochetNode, "ch_sp_cont", ["ch_sp_cont", true, "violet"]);

export default crochetNodeFactory;
