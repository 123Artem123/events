const EventsRepository = require('./EventsRepository');

jest.mock('../connection', () => jest.fn());

jest.mock(
  '../models/event',
  () =>
    function model() {
      return { create: async () => Promise.resolve('done') };
    }
);

describe('EventsRepository', () => {
  test('should create', async () => {
    const eventsRepository = new EventsRepository();
    const res = await eventsRepository.create('test');
    expect(res).toBe('done');
  });
});
