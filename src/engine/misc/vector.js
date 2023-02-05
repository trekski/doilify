class Vec2d {
  constructor() {
    // var argLen = arguments.length;
    var tmpX, tmpY;

    // 1st. argument an array => construct the vector given an array of coordinates
    if (arguments[0] instanceof Array) {
      if (arguments[0].length < 2)
        throw new Error("Not enough coordinates in array");
      tmpX = arguments[0][0];
      tmpY = arguments[0][1];
      // 1st. arg. not an array => each arg a coordiante
    } else {
      if (arguments.length < 2) throw new Error("Not enough coordinates");
      tmpX = arguments[0];
      tmpY = arguments[1];
    }

    if (typeof tmpX !== "number" || typeof tmpY !== "number")
      throw new Error("both coordinates must be numbers!");
    this._x = tmpX;
    this._y = tmpY;
  }

  getTxt(r = 0) {
    return this._x.toFixed(r) + "," + this._y.toFixed(r);
  }

  toString() {
    return "[Vector (" + this.getTxt() + ")]";
  }

  getArray() {
    return [this._x, this._y];
  }

  add(v) {
    if (!(v instanceof Vec2d)) throw new Error("add(v) : v must be a vec2d");
    return new this.constructor(this._x + v._x, this._y + v._y);
  }

  scale(s) {
    // dot product
    if (typeof s !== "number" || isNaN(s))
      throw new Error("scale(s) : s must be a number");
    return new this.constructor(this._x * s, this._y * s);
  }

  sub(v) {
    if (!(v instanceof Vec2d)) throw new Error("sub(v) : v must be a vec2d");
    return this.add(v.scale(-1));
  }

  dot(v) {
    // dot product
    if (!(v instanceof Vec2d)) throw new Error("dot(v) : v must be a vec2d");
    return this._x * v._x + this._y * v._y;
  }

  xprod(v) {
    // z of the (would be 3D) tensor multiplication, if input z = const(0)
    if (!(v instanceof Vec2d)) throw new Error("xprod(v) : v must be a vec2d");
    return this._x * v._y - this._y * v._x;
  }

  get len() {
    return Math.sqrt(this.dot(this));
  }

  set len(e) {
    if (typeof e !== "number") return;
    const now = this.len;
    if (now === 0) return;
    [this._x, this._y] = this.scale(e / now).getArray();
  }

  setLength(l) {
    this.len = l;
    return this;
  }

  rot(phi) {
    // rotate the vector by angle phi
    if (typeof phi !== "number" || isNaN(phi))
      throw new Error("rot(phi) : phi must be a number");
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    const newX = this._x * c + this._y * s;
    const newY = -this._x * s + this._y * c;
    return new this.constructor(newX, newY);
  }

  turnr() {
    return new this.constructor(-this._y, this._x);
  }

  turnl() {
    return new this.constructor(this._y, -this._x);
  }

  unit() {
    return this.scale(1 / this.len);
  }

  norm(sgn) {
    return sgn ? this.unit().turnl() : this.unit().turnr();
  }

  phi() {
    // so that (1,0)->0, (0,-1)->PI/2, (-1,0)->PI, (0,1)->3*PI/2
    return this._x === 0 && this._y === 0
      ? NaN
      : (Math.PI + Math.atan2(this._y, -this._x)) % (2 * Math.PI);
  }

  static SUM(vectors) {
    const a = vectors instanceof Array ? vectors : Array.from(arguments);
    let res;
    try {
      res = a.reduce((prev, curr) => prev.add(curr));
    } catch {
      throw new Error("vec2d.SUM : all elements must be vec2d");
    }
    return res;
  }
}

export default Vec2d;
