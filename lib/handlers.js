
const Path = require('path');
const Configuration = require(Path.join(__dirname, 'configuration.js'));


class ProxyHandlers {

  static get(targ, key/*, proxy*/) {
    if (key.constructor == Symbol) {
      // ignore symbols, use only string keys.
      return;
    }

    let data = targ['_op']['handlers'][key];
    let handlers = (data && data['get']) || [];

    let res = targ[key];

    for (let idx = 0; idx < handlers.length; idx++) {
      res = handlers[idx].call(targ, res);
    }

    return res;
  }

  static set(targ, key, val/*, proxy*/) {
    let data = targ['_op']['handlers'][key];
    let handlers = (data && data['set']) || [];

    if (val.constructor === Object) {
      // simple hack to allow for recursive functionality.
      val = new targ.constructor(val);
    }

    let res = val;

    for (let idx = 0; idx < handlers.length; idx++) {
      res = handlers[idx].call(targ, res);
    }

    targ[key] = res;

    return true;
  }

}


module.exports = ProxyHandlers;
