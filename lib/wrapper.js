

class DataWrapper {

  constructor(data, constr) {
    let inst = new (constr || data.constructor)(data);

    return inst;
  }

}


module.exports = DataWrapper;
