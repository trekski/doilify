class FactoryClass {
  constructor (exampleClass, attributeName = false, numAddArguments = 0) {
    this.className = exampleClass.name
    this.numAddArguments = numAddArguments
    this.knownClasses = new Map()
    if (attributeName !== false) {
      if (exampleClass.prototype[attributeName]) {
        this.getKeyType = (typeof exampleClass.prototype[attributeName]) // exampleClass must have the attribute attr defined
        this.getKeyAttr = attributeName
      } else {
        throw new Error(`factoryClass : class '${exampleClass.name}' does not have the attribute/method '${attributeName}'`)
      }
    } else {
      this.getKeyType = false
      this.getKeyAttr = false
    }
  }

  registerClass (newClass, classKey = false, additionalArguments = []) {
    let key // what code to register the new class under
    if (this.getKeyAttr !== false) { // i.e. class has a "code accessor" - get it
      try {
        key = (this.getKeyType === 'function')
          ? newClass.prototype[this.getKeyAttr]()
          : newClass.prototype[this.getKeyAttr]
      } catch (error) {
        throw new Error(`${this.className} factory : class ${newClass.name} must expose the '${this.getTypeFunc}' method or attribute`)
      }
    } else { // class has no code accessor - ge it explicitly
      if (classKey === false) throw new Error(`factoryClass : factory of '${this.className}' needs explicit keys`)
      key = classKey
    }
    const item = {
      class: newClass,
      arguments: additionalArguments
    }
    this.knownClasses.set(key, item)

    return this
  }

  getNewObject (type, ...rest) {
    const Cls = this.knownClasses.get(type).class
    const extraArgs = this.knownClasses.get(type).arguments
    if (typeof Cls === 'undefined') throw new Error(`${this.className} factory : invalid ${this.className} type '${type}'`)
    const constructorArgs = extraArgs.concat(rest)
    return new Cls(...constructorArgs)
  }

  getClass (type) {
    const Cls = this.knownClasses.get(type).class
    if (typeof Cls === 'undefined') throw new Error(`${this.className} factory : invalid ${this.className} type '${type}'`)
    return Cls
  }

  getArgs (type) {
    return this.knownClasses.get(type).arguments
  }

  isValidType (type) {
    return this.knownClasses.has(type)
  }
}

export default FactoryClass
