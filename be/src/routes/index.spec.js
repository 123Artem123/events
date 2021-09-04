const mockUse = jest.fn();
jest.mock('express', () => ({
  Router: () => ({ use: mockUse }),
}));
jest.mock('./events', () => 'eventsRoutes');

const eventsRoute = require('./index');

describe('app routes', () => {
  test('events routes should be registered', async () => {
    expect(mockUse).toHaveBeenCalledWith('/events', 'eventsRoutes');
  });
});
