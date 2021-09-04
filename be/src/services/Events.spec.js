const EventsService = require('./Events');

describe('EventsService', () => {
  test('should createEvent', async () => {
    const event = 'event';
    const mockRepository = { create: jest.fn(() => event) };
    const eventsService = new EventsService(mockRepository);
    expect(eventsService.createEvent()).toBe(event);
  });
});
