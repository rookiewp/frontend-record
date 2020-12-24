// fn.bind(obj1).bind(obj2).bind(obj3), fn中的this指向obj1
Function.prototype.bind = function fakeBind(obj) {
  const fn = this;
  var args = Array.from(arguments).slice(1);
  return function bound() {
    return fn.apply(
      obj,
      args.concat(Array.from(arguments))
    );
  };
};

//  fn.bind(obj1).bind(obj2).bind(obj3), fn中的this指向obj3
Function.prototype.softBind = function softBind(obj) {
  const fn = this;
  var args = Array.from(arguments).slice(1);
  return function bound() {
    return fn.apply(
      (!this || this === window) ? obj : this,
      args.concat(Array.from(arguments))
    );
  };
};


