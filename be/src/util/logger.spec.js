const mockRfc = jest.fn();
jest.mock('morgan', () => jest.fn());
jest.mock('rotating-file-stream', () => mockRfc);
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

const OLD_ENV = process.env;
process.env.NODE_ENV = 'production';
require('./logger');

describe('logger', () => {
  afterAll(() => {
    process.env = OLD_ENV;
  });
  test('should rotate access logs in log dir', async () => {
    const [[logs, { interval, path }]] = mockRfc.mock.calls;
    expect(logs).toBe('access.log');
    expect(interval).toBe('1d');
    expect(new RegExp(/\/log$/).test(path)).toBe(true);
  });
});
