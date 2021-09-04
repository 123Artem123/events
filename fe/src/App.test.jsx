import { render, screen } from '@testing-library/react';
import App from './App';

test('renders EventsFormContainer', () => {
  render(<App />);
  const eventsContainer = screen.getByTestId("EventsFormContainer");
  expect(eventsContainer).toBeInTheDocument();
});
