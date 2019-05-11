
const Path = require('path');

const specPath = Path.join(__dirname, '..');
const appPath = Path.join(specPath, '..');

const ProxyHandlers = require(Path.join(appPath, 'lib', 'handlers.js'));


describe(ProxyHandlers.name, () => {
  const subject = ProxyHandlers;

  it('has a getter that an ECMA Proxy can find', () => {
    expect(subject.get).toBeDefined();
  });

  it('has a setter that an ECMA Proxy can find', () => {
    expect(subject.set).toBeDefined();
  });

});
