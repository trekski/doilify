import CrochetLink from "../crochetLink.js";
// import CrochetLinkExternal from '../crochetLinkExternal.js'
// import CrochetLinkSequential from '../crochetLinkSequential.js'
// import CrochetLinkZero from '../crochetLinkZero.js'
// import CrochetLinkCHSpace from '../crochetLinkCHSpace.js'
import crochetLinkFactory from "../linkFactory.js";

function crochetLinkDemo(log) {
  const n1 = { x: 1, y: 2, registerNeighbor: () => {} };
  const n2 = { x: -1, y: 3, registerNeighbor: () => {} };
  const n3 = { x: -5, y: -5, registerNeighbor: () => {} };

  var l = new CrochetLink("default", 5, false, "lightgray", "A", n1, n2);
  log(`${l} : type ${l.type}`);

  log(`${l} : len ${l.defLen} `);

  log(`${l} : color ${l.color} `);

  l = new CrochetLink("zero", 0, false, "lightgray", "A", n3, n1);
  log(`${l} : ends n3 ${l.getOtherEnd(n3)} `);
  log(`${l} : ends n2 ${l.getOtherEnd(n2)} `);

  log(crochetLinkFactory.knownClasses.get("chain_space").class.name);
  log(crochetLinkFactory.getNewObject("external", "A", n1, n2));
}

export default crochetLinkDemo;
