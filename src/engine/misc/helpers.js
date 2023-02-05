class IdGenerator {
  constructor(prefix) {
    this.prefix = prefix;
    this.index = 0;
  }

  next() {
    return this.prefix + "_" + this.index++;
  }
}

export default IdGenerator;
