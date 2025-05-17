import { render, screen } from '@testing-library/react';
import App from './App';
import { applications, users, internships, companies, statusTypes, industries, locations } from '../data/dummyData';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
