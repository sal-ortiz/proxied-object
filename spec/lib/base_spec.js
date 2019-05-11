
const Path = require('path');

const specPath = Path.join(__dirname, '..');
const appPath = Path.join(specPath, '..');

const ObjectBase = require(Path.join(appPath, 'lib', 'base.js'));


describe(ObjectBase.name, () => {
  const subject = ObjectBase;

  describe('an instance of', () => {
    let instance;

    describe('given an object as input', () => {
      let input = [{ one: 1, two: 2, three: 3}];

      beforeEach(() => {
        instance = new subject(...input);
      });

      it ('contains the contents of our input object', () => {
        let inp = input[0];

        for (let key in inp) {
          expect(instance[key]).toEqual(inp[key]);
        }

      });

    });

    describe('given no input', () => {

      beforeEach(() => {
        instance = new subject();
      });

      it ('contains nothing', () => {
        let keys = Object.keys(instance);

        expect(keys.length).toEqual(0);
      });

    });

  });

});
