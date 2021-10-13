class FactoryClass {
  constructor (exampleClass, attr, argumentNames = []) {
    this.className = exampleClass.name
    console.log(exampleClass)
    if (exampleClass.prototype[attr]) {
      this.getKeyType = (typeof exampleClass.prototype[attr])
      this.getKeyAttr = attr
    } else {
      throw new Error(`facotryCLass : class '${exampleClass.name}' does not have the attribute/method '${attr}'`)
    }
    this.argumentNames = argumentNames
    this.items = new Map()
    this.registerClass(exampleClass)
  }

  registerClass (newClass) {
    try {
      let key
      if (this.getKeyType === 'function') {
        key = newClass.prototype[this.getKeyAttr]()
      } else {
        key = newClass.prototype[this.getKeyAttr]
      }
      this.items.set(key, newClass)
    } catch (error) {
      throw new Error(`${this.className} factory : class ${newClass.name} must expose the '${this.getTypeFunc}' method or attribute`)
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
