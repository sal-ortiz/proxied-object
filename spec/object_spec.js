
const Path = require('path');

const specPath = Path.join(__dirname);
const appPath = Path.join(specPath, '..');

const ProxiedObject = require(Path.join(appPath, 'object.js'));


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
