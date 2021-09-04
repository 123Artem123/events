const mockPost = jest.fn();
const mockRoute = jest.fn(() => ({ post: mockPost }));
jest.mock('../validations/events', () => ({
  createEvent: jest.fn(),
}));
jest.mock('../controllers/events', () => ({
  create: 'createController',
}));
jest.mock('express', () => ({
  Router: () => ({ route: mockRoute }),
}));
jest.mock('express-validation', () => ({
  validate: jest.fn(() => 'validate'),
}));
const events = require('./events');

describe('events routes', () => {
  test('post create should be registered', async () => {
    expect(mockRoute).toHaveBeenCalledWith('/');
    expect(mockPost).toHaveBeenCalledWith('validate', 'createController');
  });
});
