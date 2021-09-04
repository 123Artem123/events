const headersHandler = require('./headersHandler');

describe('headersHandler', () => {
  test('should add json header', async () => {
    const setHeader = jest.fn();
    const next = jest.fn();
    headersHandler(jest.fn(), { setHeader }, next);
    expect(setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(next).toHaveBeenCalledWith();
  });
});
