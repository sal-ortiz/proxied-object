
const Path = require('path');
const Configuration = require(Path.join(__dirname, 'configuration.js'));


class ObjectBase extends Object {

  constructor(inp) {
    super(inp);

    Object.assign(this, inp);

    this['_op'] = {};
    this['_op']['handlers'] = {};
  }

  onGet(/* ... */) {

    if (arguments.length > 1) {
      // two arguments: a target key and a callback.
      let key = arguments[0];
      let callback = arguments[1];

      return this.setTargetedGetter(key, callback);

    } else {
      // one argument: just a callback.
      let callback = arguments[0];

      return this.setGlobalGetter(callback);
    }

  }

  onSet(/* ... */) {

    if (arguments.length > 1) {
      // two arguments: a target key and a callback.
      let key = arguments[0];
      let callback = arguments[1];

      return this.setTargetedSetter(key, callback);

    } else {
      // one argument: just a callback.
      let callback = arguments[0];

      return this.setGlobalSetter(callback);
    }

  }

  setTargetedGetter(key, callback) {
    this.initTargetedHandlers(key);

    if (Configuration.singleCallbackPerAction) {
      this['_op']['handlers'][key]['get'] = [callback];

    } else {
      this['_op']['handlers'][key]['get'].push(callback);

    }

  }

  setTargetedSetter(key, callback) {
    this.initTargetedHandlers(key);

    if (Configuration.singleCallbackPerAction) {
      this['_op']['handlers'][key]['set'] = [callback];

    } else {
      this['_op']['handlers'][key]['set'].push(callback);

    }

  }

  setGlobalGetter(callback) {
    this.initGlobalHandlers();

    if (Configuration.singleCallbackPerAction) {
      this['_op']['handlers']['_globalGet'] = [callback];

    } else {
      this['_op']['handlers']['_globalGet'].push(callback);

    }

  }

  setGlobalSetter(callback) {
     this.initGlobalHandlers();


    if (Configuration.singleCallbackPerAction) {
      this['_op']['handlers']['_globalSet'] = [callback];

    } else {
      this['_op']['handlers']['_globalSet'].push(callback);

    }

  }

  initTargetedHandlers(key, force) {

    if (!this['_op']['handlers'][key] || !!force) {

      this['_op']['handlers'][key] = {
        get: [],
        set: [],
      };

    }

  }

  initGlobalHandlers() {
    this['_op']['handlers']['_globalGet'] = []
    this['_op']['handlers']['_globalSet'] = []

  }

}


module.exports = ObjectBase;
