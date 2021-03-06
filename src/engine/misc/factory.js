class FactoryClass {
  constructor (exampleClass, func, argumentNames = []) {
    this.className = exampleClass.name
    if (typeof (exampleClass[func]) === 'function') {
      this.getTypeFunc = func
    } else {
      throw new Error(`facotryCLass : class '${exampleClass.name}' does not have the method '${func}'`)
    }
    this.argumentNames = argumentNames
    this.items = new Map()
    this.registerClass(exampleClass)
  }

  registerClass (newClass) {
    try {
      this.items.set(newClass[this.getTypeFunc](), newClass)
    } catch (error) {
      throw new Error(`${this.className} factory : class ${newClass.name} must expose the '${this.getTypeFunc}' method`)
    }
    return this
  }

  getNewObject (type, ...rest) {
    const Cls = this.items.get(type)
    if (typeof Cls === 'undefined') throw new Error(`${this.className} factory : invalid ${this.className} type '${type}'`)
    return new Cls(...rest)
  }

  getClass (type) {
    const Cls = this.items.get(type)
    if (typeof Cls === 'undefined') throw new Error(`${this.className} factory : invalid ${this.className} type '${type}'`)
    return Cls
  }

  isValidType (type) {
    return this.items.has(type)
  }
}

export default FactoryClass
