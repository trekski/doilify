import FactoryClass from "../../misc/factory.js";
import CrochetOperation from "./crochetOperation.js";

import CrochetOperationMakeOrigin from "./crochetOperationMakeOrigin.js";
import CrochetOperationBasic from "./crochetOperationBasic.js";
import CrochetOperationCopy from "./crochetOperationCopy.js";
import CrochetOperationMove from "./crochetOperationMove.js";
import CrochetOperationMerge from "./crochetOperationMerge.js";

const CrochetOperationFactory = new FactoryClass(
  CrochetOperation,
  "commandName"
);

CrochetOperationFactory.registerClass(CrochetOperation)
  .registerClass(CrochetOperationMakeOrigin)
  .registerClass(CrochetOperationBasic)
  .registerClass(CrochetOperationCopy)
  .registerClass(CrochetOperationMove)
  .registerClass(CrochetOperationMerge);

export default CrochetOperationFactory;
