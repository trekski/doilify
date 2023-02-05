import IdGenerator from "../helpers.js";

function helperDemo(log) {
  const v1 = new IdGenerator("A");
  const v2 = new IdGenerator("B");
  log(`A : ${v1.next()}`);
  log(`A : ${v1.next()}`);
  log(`A : ${v1.next()}`);
  log(`B : ${v2.next()}`);
  log(`B : ${v2.next()}`);
  log(`A : ${v1.next()}`);
}

export default helperDemo;
