import FactoryClass from "../misc/factory.js";

import CrochetStitch from "./crochetStitch.js";
import CrochetStitchLazy from "./crochetStitchLazy.js";
const CrochetStitchFactory = new FactoryClass(CrochetStitch, false, 4);

CrochetStitchFactory.registerClass(CrochetStitch, "default", [
  "default",
  true,
  0,
  "mk:default:default",
])
  .registerClass(CrochetStitchLazy, "origin", [
    "origin",
    false,
    0,
    "makeorigin",
  ])
  .registerClass(CrochetStitch, "ch", [
    "ch",
    true,
    0,
    "mk:sequence:start; mk:draw:finish:5:ch",
  ])
  .registerClass(CrochetStitch, "sc", [
    "sc",
    true,
    1,
    "mk:sequence:start; mk:sequence:finish; mv:other; mk:external:hook; mk:draw:finish:5:sc; merge:left",
  ])
  .registerClass(CrochetStitch, "dc", [
    "dc",
    true,
    1,
    "mk:sequence:start; mk:sequence:finish; mv:other; mk:external:hook; mk:draw:finish:25:dc; merge:left",
  ])
  .registerClass(CrochetStitch, "slst", [
    "slst",
    true,
    1,
    "mk:sequence:start; mk:sequence:finish; mv:other; mk:external:hook; merge:right",
  ]);
export default CrochetStitchFactory;
