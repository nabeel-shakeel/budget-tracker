import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './index';

describe('Input Component', () => {
  test('renders the Input component with default properties', () => {
    render(<Input placeholder="Enter text" />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler when user types', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Enter text" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue('Hello');
  });

  test('renders with custom props', () => {
    render(<Input placeholder="Custom Input" disabled={true} />);

    const inputElement = screen.getByPlaceholderText('Custom Input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeDisabled();
  });
});
