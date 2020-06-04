
const Path = require('path');
const Configuration = require(Path.join(__dirname, 'configuration.js'));
const DataWrapper = require(Path.join(__dirname, 'wrapper.js'));


class ProxyHandlers {

  static get(targ, key/*, proxy*/) {
    if (key.constructor == Symbol) {
      // ignore symbols, use only string keys.
      return;
    }

    let handlersList = targ['_op']['handlers'];

    let globalHandlers = handlersList['_globalGet'] || [];
    let res = targ[key];

    for (let globalIdx = 0; globalIdx < globalHandlers.length; globalIdx++) {
      res = globalHandlers[globalIdx].call(targ, key, res);
    }

    let localHandlers = (handlersList[key] && handlersList[key]['get']) || [];

    for (let localIdx = 0; localIdx < localHandlers.length; localIdx++) {
      res = localHandlers[localIdx].call(targ, key, res);
    }

    return res;
  }

  static set(targ, key, val/*, proxy*/) {
    let res;

    if ((val && val.constructor === Object)
        || (val && val.constructor === Function)
       ) {
      // simple hack to allow for recursive functionality.
      res = new DataWrapper(val, targ.constructor);
    } else {
      // try to preserve user types in data.
      res = new DataWrapper(val);
    }

    let handlersList = targ['_op']['handlers'];

    let globalHandlers = handlersList['_globalSet'] || [];

    for (let globalIdx = 0; globalIdx < globalHandlers.length; globalIdx++) {
      res = globalHandlers[globalIdx].call(targ, key, res);
    }

    let localHandlers = (handlersList[key] && handlersList[key]['set']) || [];

    for (let localIdx = 0; localIdx < localHandlers.length; localIdx++) {
      res = localHandlers[localIdx].call(targ, key, res);
    }

    targ[key] = res;

    return true;
  }

}


module.exports = ProxyHandlers;
