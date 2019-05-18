
const Path = require('path');

const specPath = Path.join(__dirname);
const appPath = Path.join(specPath, '..');

const ProxiedObject = require(Path.join(appPath, 'object.js'));
const ObjectBase = require(Path.join(appPath, 'lib', 'base.js'));


describe(ProxiedObject.name, () => {
  const subject = ProxiedObject;

  describe('an instance of', () => {
    let instance;

    describe('given an object as input', () => {
      let input = { one: 1, two: 2, three: 3};

      beforeEach(() => {
        instance = new subject(input);
      });

      it('contains the contents of our input object', () => {

        for (let key in input) {
          expect(instance[key]).toEqual(input[key]);
        }

      });

      it('exposes BaseObject\'s onGet() function', () => {
        // onGet's functionality is tested with BaseObject.
        // we only need to verify that the method popagates.
        let baseInstance = new ObjectBase();

        expect(instance.onGet).toEqual(baseInstance.onGet);
      });

      it('exposes BaseObject\'s onSet() function', () => {
        // onSet's functionality is tested with BaseObject.
        // we only need to verify that the method popagates.
        let baseInstance = new ObjectBase();

        expect(instance.onSet).toEqual(baseInstance.onSet);
      });

    });

    describe('given no input', () => {

      beforeEach(() => {
        instance = new subject();
      });

      it('contains nothing', () => {
        let keys = Object.keys(instance);

        expect(keys.length).toEqual(0);
      });

    });

  });

});
