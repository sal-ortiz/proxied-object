
const Path = require('path');
const libPath = Path.join(__dirname, 'lib');

const Handlers = require(Path.join(libPath, 'handlers.js'));
const Base = require(Path.join(libPath, 'base.js'));


class ProxiedObject {

  constructor(inp) {
    let obj = new Base(inp);

    return new Proxy(obj, Handlers);
  }

}


module.exports = ProxiedObject;
