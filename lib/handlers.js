
const Path = require('path');


class ProxyHandlers {

  static get(targ, key/*, proxy*/) {
    let data = targ['.op']['handlers'][key];
    let handlers = (data && data['get']) || [];

    let res = targ[key];

    for (let idx = 0; idx < handlers.length; idx++) {
      let handler = handlers[idx];

      res = handler.call(targ, res);
    }

    return res;
  }

  static set(targ, key, val/*, proxy*/) {
    let data = targ['.op']['handlers'][key];
    let handlers = (data && data['set']) || [];

    let res = val;

    for (let idx = 0; idx < handlers.length; idx++) {
      let handler = handlers[idx];

      res = handler.call(targ, res);
    }

    targ[key] = res;

    return true;
  }

}


module.exports = ProxyHandlers;



//module.exports = {
//
//  get: (targ, key/*, proxy*/) => {
//    let handler = targ['.op']
//      && targ['.op']['handlers']
//      && targ['.op']['handlers'][key]
//      && targ['.op']['handlers'][key]['get'];
//
//    if (handler) {
//      return handler.call(targ, targ[key]);
//    } else {
//      return targ[key];
//    }
//
//  },
//
//  set: (targ, key, val/*, proxy*/) => {
//    let handler = targ['.op']
//      && targ['.op']['handlers']
//      && targ['.op']['handlers'][key]
//      && targ['.op']['handlers'][key]['set'];
//
//    if (handler) {
//      targ[key] = handler.call(targ, val);
//    } else {
//      targ[key] = val;
//    }
//
//    return true;
//  },
//
//};
