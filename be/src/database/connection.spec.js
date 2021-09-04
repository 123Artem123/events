const DB_HOST = 'DB_HOST';
const DB_DATABASE = 'DB_DATABASE';
const DB_USER = 'DB_USER';
const DB_PASSWORD = 'DB_PASSWORD';
const OLD_ENV = process.env;
process.env.DB_HOST = DB_HOST;
process.env.DB_DATABASE = DB_DATABASE;
process.env.DB_USER = DB_USER;
process.env.DB_PASSWORD = DB_PASSWORD;

jest.mock('sequelize', () => ({
  Sequelize: function test(db, user, pass, options) {
    return { db, user, pass, options };
  },
}));

const connection = require('./connection');

describe('connection', () => {
  afterAll(() => {
    process.env = OLD_ENV;
  });
  test('should use correct connections params', async () => {
    const { db, user, pass } = connection;
    expect(db).toBe(DB_DATABASE);
    expect(user).toBe(DB_USER);
    expect(pass).toBe(DB_PASSWORD);
  });

  test('should enable db logging', async () => {
    const {
      options: { logging },
    } = connection;
    expect(typeof logging).toBe('function');
  });
});
