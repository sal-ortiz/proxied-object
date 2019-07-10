
const Path = require('path');
const Configuration = require(Path.join(__dirname, 'configuration.js'));


class ObjectBase extends Object {

  constructor(inp) {
    super(inp);

    Object.assign(this, inp);

    this['_op'] = {};
    this['_op']['handlers'] = {};
  }

  onGet(key, callback) {
    this.initHandlers(key);

    if (!Configuration.singleCallbackPerAction) {
      this['_op']['handlers'][key]['get'].push(callback);

    } else {
      let data = this['_op']['handlers'][key]['get'];

      this['_op']['handlers'][key]['get'] = [callback];
    }

  }

  onSet(key, callback) {
    this.initHandlers(key);

    if (!Configuration.singleCallbackPerAction) {
      this['_op']['handlers'][key]['set'].push(callback);

    } else {
      let data = this['_op']['handlers'][key]['set'];

      this['_op']['handlers'][key]['set'] = [callback];
    }

  }

  initHandlers(key, force) {

    if (!this['_op']['handlers'][key] || !!force) {

      this['_op']['handlers'][key] = {
        get: [],
        set: [],
      };

    }

  }

}


module.exports = ObjectBase;
