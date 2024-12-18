import { render, screen } from '@testing-library/react';
import { Card } from './index';

describe('Card Component', () => {
  test('renders the Card component with title and children', () => {
    render(
      <Card title="Test Title">
        <p>Test Content</p>
      </Card>
    );

    const cardElement = screen.getByText('Test Title');
    expect(cardElement).toBeInTheDocument();

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  test('renders with additional props', () => {
    render(
      <Card
        role="region"
        title="Extra Props"
        style={{ backgroundColor: 'red' }}
      >
        <p>Extra Props Content</p>
      </Card>
    );

    const cardElement = screen.getByRole('region');
    expect(cardElement).toHaveStyle('background-color: red');
  });
});
