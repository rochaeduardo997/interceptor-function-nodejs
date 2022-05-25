const { eventOrder } = require('./constants');

class Decorator{
  static #decorate = ({ fn, when }, oldFunction) => async (...args) => {
    const [first, second] = when === eventOrder.afterOriginalCall
      ? [oldFunction, fn]
      : [fn, oldFunction];
    
    const result        = await first.apply(this, args);
    const defaultFormat = Array.isArray(result) 
      ? result 
      : [result];

    return second.apply(this, defaultFormat);
  }

  static decorateModule(overrideMethods, target){
    const moduleClone    = Object.assign({}, target);
    const finalFunctions = new Map();

    for(const [key, value] of overrideMethods){
      const oldFunction = Reflect.get(moduleClone, key);
      this.#decorate(value, oldFunction);
      finalFunctions.set(key ,this.#decorate(value, oldFunction));
    }

    const newFunctions = Object.fromEntries(finalFunctions);
    Object.assign(target, newFunctions);
  }
}

module.exports = Decorator;
