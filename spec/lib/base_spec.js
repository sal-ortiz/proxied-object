
const Path = require('path');

const specPath = Path.join(__dirname, '..');
const appPath = Path.join(specPath, '..');

const ObjectBase = require(Path.join(appPath, 'lib', 'base.js'));

const META_KEY = '.op';


describe(ObjectBase.name, () => {
  const subject = ObjectBase;

  describe('an instance of', () => {
    let instance;

    describe('given an object as input', () => {
      let input = { one: 1, two: 2, three: 3, };

      beforeEach(() => {
        instance = new subject(input);
      });

      it('contains the contents of our input object as well as our meta data', () => {

        for (let key in input) {
          expect(instance[key]).toEqual(input[key]);
        }

        expect(instance[META_KEY]).toBeDefined();
      });

      describe('the onGet method', () => {

        describe('given a key and a callback as input', () => {
          let key = 'test';
          let callback = () => {};

          beforeEach(() => {
            instance.onGet(key, callback);
          });

          it('sets a handler for the given key', () => {
            let handlers = instance[META_KEY].handlers;

            expect(handlers[key].get).toEqual(callback)
          });

        });

      });

      describe('the onSet method', () => {

        describe('given a key and a callback as input', () => {
          let key = 'test';
          let callback = () => {};

          beforeEach(() => {
            instance.onSet(key, callback);
          });

          it('sets a handler for the given key', () => {
            let handlers = instance[META_KEY].handlers;

            expect(handlers[key].set).toEqual(callback)
          });

        });

      });

    });

    describe('given no input', () => {

      beforeEach(() => {
        instance = new subject();
      });

      it('contains only our meta', () => {
        let keys = Object.keys(instance);

        expect(keys.length).toEqual(1);
        expect(instance[META_KEY]).toBeDefined();
      });

      describe('the onGet method', () => {

        describe('given a key and a callback as input', () => {
          let key = 'test';
          let callback = () => {};

          beforeEach(() => {
            instance.onGet(key, callback);
          });

          it('sets a handler for the given key', () => {
            let handlers = instance[META_KEY].handlers;

            expect(handlers[key].get).toEqual(callback)
          });

        });

      });

      describe('the onSet method', () => {

        describe('given a key and a callback as input', () => {
          let key = 'test';
          let callback = () => {};

          beforeEach(() => {
            instance.onSet(key, callback);
          });

          it('sets a handler for the given key', () => {
            let handlers = instance[META_KEY].handlers;

            expect(handlers[key].set).toEqual(callback)
          });

        });

      });

    });

  });

});
