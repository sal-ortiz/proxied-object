
const Path = require('path');

const specPath = Path.join(__dirname);
const appPath = Path.join(specPath, '..');

const ProxiedObject = require(Path.join(appPath, 'object.js'));
const ObjectBase = require(Path.join(appPath, 'lib', 'base.js'));

const META_KEY = '_op';


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

          expect(handlers[key].get[0]).toHaveBeenCalled();
        });

        it('returns the value returned by the callback', () => {
          expect(instance[key]).toEqual(value);
        });

        describe('given multiple callbacks', () => {
          let callbacks = [
            jasmine.createSpy('first getter callback')
              .and.returnValue('one'),

            jasmine.createSpy('second getter callback')
              .and.returnValue('two'),

            jasmine.createSpy('third getter callback')
              .and.returnValue('three'),
          ];

          beforeEach(() => {
            instance.onGet(key, callbacks[0]);
            instance.onGet(key, callbacks[1]);
            instance.onGet(key, callbacks[2]);
          });

          it('calls each handler sequentially', () => {
            let val = instance[key];

            // NOTE: This is a frail test. We aren't tracking the
            //       progress of the callbacks on the event loop.
            expect(callbacks[0]).toHaveBeenCalledBefore(callbacks[1]);
            expect(callbacks[1]).toHaveBeenCalledBefore(callbacks[2]);
          });

          xit('aggregates the returned values', () => {
            let val = instance[key];

            expect(callbacks[0]).toHaveBeenCalledWith(value);
            expect(callbacks[1]).toHaveBeenCalledWith('one');
            expect(callbacks[2]).toHaveBeenCalledWith('two');

            expect(val).toEqual('three');
          });

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

          expect(handlers[key].set[0]).toHaveBeenCalled();
        });

        it('sets the value returned by the callback', () => {
          instance[key] = Date.now();

          expect(instance[key]).toEqual(value);
        });

        describe('given multiple callbacks', () => {
          let callbacks = [
            jasmine.createSpy('first getter callback')
              .and.returnValue('one'),

            jasmine.createSpy('second getter callback')
              .and.returnValue('two'),

            jasmine.createSpy('third getter callback')
              .and.returnValue('three'),
          ];

          beforeEach(() => {
            instance.onSet(key, callbacks[0]);
            instance.onSet(key, callbacks[1]);
            instance.onSet(key, callbacks[2]);
          });

          xit('calls each handler sequentially', () => {
            instance[key] = value;

            // NOTE: This is a frail test. We aren't tracking the
            //       progress of the callbacks on the event loop.
            expect(callbacks[0]).toHaveBeenCalledBefore(callbacks[1]);
            expect(callbacks[1]).toHaveBeenCalledBefore(callbacks[2]);
          });

          it('aggregates the returned values', () => {
            instance[key] = value;

            expect(callbacks[0]).toHaveBeenCalledWith(value);
            expect(callbacks[1]).toHaveBeenCalledWith('one');
            expect(callbacks[2]).toHaveBeenCalledWith('two');

            expect(instance[key]).toEqual('three');
          });

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

          expect(handlers[key].get[0]).toHaveBeenCalled();
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

          expect(handlers[key].set[0]).toHaveBeenCalled();
        });

        it('sets the value returned by the callback', () => {
          instance[key] = Date.now();

          expect(instance[key]).toEqual(value);
        });

      });

    });

  });

});
