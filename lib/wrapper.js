

class DataWrapper {

  constructor(data, constr) {

    let inst;

    if (data != undefined) {
      inst = new (constr || data.constructor)(data);

    }

    return inst;
  }

}


module.exports = DataWrapper;
