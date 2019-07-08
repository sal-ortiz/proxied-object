


class ObjectBase extends Object {

  constructor(inp) {
    super(inp);

    Object.assign(this, inp);

    this['_op'] = {};
    this['_op']['handlers'] = {
      init: [],
      exec: [],
    };

  }

  onInitialize(callback) {
    this.initHandlers(key);

    this['_op']['handlers']['init'].push(callback);

    if (Configuration.singleCallbackPerAction) {
      let data = this['_op']['handlers']['init'];

      this['_op']['handlers']['init'] = [callback];
    }

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

  onCall(callback) {
    this.initHandlers(key);


    if (!Configuration.singleCallbackPerAction) {
      this['_op']['handlers'][key]['exec'].push(callback);

    } else {
      let data = this['_op']['handlers']['exec'];

      this['_op']['handlers']['exec'] = [callback];
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
