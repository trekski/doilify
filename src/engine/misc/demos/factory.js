import FactoryClass from "../factory.js";

function factoryDemo(log) {
  class n {
    getType() {
      return "x";
    }
  }
  const x = new FactoryClass(n, "getType");

  class n1 {
    getType() {
      return "a";
    }
  }

  x.registerClass(n1);

  log(x.getClass("a").name);
  log(x.getNewObject("a").constructor.name);
  log(x.getClass("a").name);

  class n2 {
    getType() {
      return "b";
    }
  }
  class n3 {
    getType() {
      return "a";
    }
  }

  x.registerClass(n2);
  x.registerClass(n3);

  log(x.getClass("a").name);
  log(x.getClass("b").name);

  class n4 {}
  try {
    x.registerClass(n4);
  } catch (e) {
    log(e);
  }

  try {
    log(x.getClass("c").name);
  } catch (e) {
    log(e);
  }

  class u {
    get Type() {
      return 1;
    }
  }
  const y = new FactoryClass(u, "Type");
  y.registerClass(u);
  log(y.knownClasses.get(1).class.name);
}

export default factoryDemo;
