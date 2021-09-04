const schemaErrorHandler = require('./schemaErrorHandler');

jest.mock('express-validation', () => ({
  ValidationError: Error,
}));

describe('schemaErrorHandler', () => {
  test('should return error', async () => {
    const next = jest.fn();
    const error = {};
    schemaErrorHandler(error, jest.fn(), jest.fn(), next);
    expect(next).toHaveBeenCalledWith(error);
  });

  test('should return validation error', async () => {
    const json = jest.fn();
    const status = jest.fn().mockImplementation(() => ({ json }));
    const error = new Error({
      statusCode: 'test',
      message: 'message',
      details: 'details',
    });
    schemaErrorHandler(error, jest.fn(), { status }, jest.fn());
    expect(status).toHaveBeenCalledWith(error.statusCode);
    expect(json).toHaveBeenCalledWith({
      message: error.message,
      details: error.details,
    });
  });
});
