


class ObjectBase extends Object {

  constructor(inp) {
    super(inp);

    Object.assign(this, inp);

    this['.op'] = {};
    this['.op']['handlers'] = {};
  }

  onGet(key, callback) {
    this.initHandlers(key);

    this['.op']['handlers'][key]['get'].push(callback);
  }

  onSet(key, callback) {
    this.initHandlers(key);

    this['.op']['handlers'][key]['set'].push(callback);
  }

  initHandlers(key) {

    if (!this['.op']['handlers'][key]) {

      this['.op']['handlers'][key] = {
        get: [],
        set: [],
      };

    }

  }

}


module.exports = ObjectBase;
