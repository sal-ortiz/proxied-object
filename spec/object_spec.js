
const Path = require('path');

const specPath = Path.join(__dirname);
const appPath = Path.join(specPath, '..');

const ProxiedObject = require(Path.join(appPath, 'object.js'));
const ObjectBase = require(Path.join(appPath, 'lib', 'base.js'));

const META_KEY = '.op';


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

      describe('the getter callback', () => {
        let key = 'one';
        let value = Math.random().toString(32);
        let callback = jasmine.createSpy('getter callback')
          .and.returnValue(value);

        beforeEach(() => {
          instance.onGet(key, callback);
        });

        it('is executed on access to a given key', () => {
          let handlers = instance[META_KEY].handlers;
          let val = instance[key];

          expect(handlers[key].get).toHaveBeenCalled();
        });

        it('returns the value returned by the callback', () => {
          expect(instance[key]).toEqual(value);
        });

      });

      describe('the setter callback', () => {
        let key = 'one';
        let value = Math.random().toString(32);
        let callback = jasmine.createSpy('setter callback')
          .and.returnValue(value);

        beforeEach(() => {
          instance.onSet(key, callback);
        });

        it('is executed on update to a given key', () => {
          let handlers = instance[META_KEY].handlers;

          instance[key] = Date.now();

          expect(handlers[key].set).toHaveBeenCalled();
        });

        it('sets the value returned by the callback', () => {
          instance[key] = Date.now();

          expect(instance[key]).toEqual(value);
        });

      });

    });

    describe('given no input', () => {

      beforeEach(() => {
        instance = new subject();
      });

      it('contains only our meta data', () => {
        let keys = Object.keys(instance);

        expect(keys.length).toEqual(1);
        expect(instance[META_KEY]).toBeDefined();
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

      describe('the getter callback', () => {
        let key = 'one';
        let value = Math.random().toString(32);
        let callback = jasmine.createSpy('getter callback')
          .and.returnValue(value);

        beforeEach(() => {
          instance.onGet(key, callback);
        });

        it('is executed on access to a given key', () => {
          let handlers = instance[META_KEY].handlers;
          let val = instance[key];

          expect(handlers[key].get).toHaveBeenCalled();
        });

        it('returns the value returned by the callback', () => {
          expect(instance[key]).toEqual(value);
        });

      });

      describe('the setter callback', () => {
        let key = 'one';
        let value = Math.random().toString(32);
        let callback = jasmine.createSpy('setter callback')
          .and.returnValue(value);

        beforeEach(() => {
          instance.onSet(key, callback);
        });

        it('is executed on update to a given key', () => {
          let handlers = instance[META_KEY].handlers;

          instance[key] = Date.now();

          expect(handlers[key].set).toHaveBeenCalled();
        });

        it('sets the value returned by the callback', () => {
          instance[key] = Date.now();

          expect(instance[key]).toEqual(value);
        });

      });

    });

  });

});
