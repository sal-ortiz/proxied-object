
const Path = require('path');
const Configuration = require(Path.join(__dirname, 'configuration.js'));


class ProxyHandlers {

  static construct(targ, args) {
    let data = this['_op']['handlers'];
    let handlers = (data && data['init']) || [];

    for (let idx = 0; idx < handlers.length; idx++) {
      handlers[idx].call(targ, ...args);
    }

  }

  static get(targ, key/*, proxy*/) {
    let keyPath = this.keyToPath(key);
    let data = this.traverseObject(targ['_op']['handlers'], keyPath);
    let handlers = (data && data['get']) || [];

    let res = this.traverseObject(targ, keyPath);

    for (let idx = 0; idx < handlers.length; idx++) {
      res = handlers[idx].call(targ, res);
    }

    return res;
  }

  static set(targ, key, val/*, proxy*/) {
    let keyPath = this.keyToPath(key);
    let data = this.traverseObject(targ['_op']['handlers'], keyPath);
    let handlers = (data && data['set']) || [];

    let res = val;

    for (let idx = 0; idx < handlers.length; idx++) {
      res = handlers[idx].call(targ, res);
    }

    this.traverseObject(targ, keyPath, res, targ.constructor);

    return true;
  }

  static apply(targ, cxt, args) {
    let data = this['_op']['handlers'];
    let handlers = (data && data['exec']) || [];

    for (let idx = 0; idx < handlers.length; idx++) {
      handlers[idx].call(targ, ...args);
    }

  }

  static keyToPath(key) {

    if (Configuration.expandCompoundKeys) {
      // split key based on '.', '#', '/'.
      return key.split(/\.|#|\//);

    } else {
      // keys interpreted literally.
      return [key];

    }

  }

  static traverseObject(store, keyPath, val, obj) {
    // if 'val' is given, the value pointed
    // to by 'keyPath' is updated with 'val'.
    let node = store;

    for (let index in keyPath.slice(0,-1)) {
      let nodeKey = keyPath[index];

      if (!node[nodeKey] && val) {
        // create a path only if we have a value to place.
        let storeObj = obj || Object;

        node[nodeKey] = new storeObj();
      }

      node = node[nodeKey]
    }

    let lastKey = keyPath.slice(-1)[0];

    if (arguments.length < 3) {
      return node[lastKey];
    } else {
      return node[lastKey] = val;
    }

  }

}


module.exports = ProxyHandlers;
