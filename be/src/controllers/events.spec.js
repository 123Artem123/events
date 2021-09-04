const eventsController = require('./events');

jest.mock(
  '../services/Events',
  () =>
    function test() {
      return { createEvent: async () => Promise.resolve('done') };
    }
);
jest.mock(
  '../database/repositories/EventsRepository',
  () =>
    function test() {
      return {};
    }
);

describe('events controller', () => {
  test('should create', async () => {
    const mockJson = jest.fn();
    await eventsController.create(
      { body: 'test' },
      { status: () => ({ json: mockJson }) }
    );
    expect(mockJson).toHaveBeenCalledWith('done');
  });
});
