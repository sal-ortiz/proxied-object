


class ObjectBase extends Object {

  constructor(inp) {
    super(inp);

    Object.assign(this, inp);
  }

  onGet(key, callback) {
    this.initHandlers(key);

    this['.op']['handlers'][key]['get'] = callback;
  }

  onSet(key, callback) {
    this.initHandlers(key);

    this['.op']['handlers'][key]['set'] = callback;
  }


  initHandlers(key) {
    this['.op'] = this['.op'] || {};
    this['.op']['handlers'] = this['.op']['handlers'] || {};

    if (key) {
      let data = this['.op']['handlers'][key];

      this['.op']['handlers'][key] = data || {};
    }

  }

}


module.exports = ObjectBase;
