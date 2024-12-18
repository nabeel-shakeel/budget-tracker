import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfileMenu } from './index';

// Mock the `useNavigate` hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mocked(mockNavigate);

describe('UserProfileMenu', () => {
  const mockProps = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  test('renders the UserProfileMenu with user details', () => {
    render(<UserProfileMenu {...mockProps} />);

    const initials = screen.getByText('JD');
    screen.debug();
    expect(initials).toBeInTheDocument();

    fireEvent.click(initials);

    const name = screen.getByText('John Doe');
    const email = screen.getByText('john.doe@example.com');
    const profileButton = screen.getByText('Profile');
    const logoutButton = screen.getByText('Logout');

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('navigates to profile when "Profile" button is clicked', () => {
    render(
      <MemoryRouter>
        <UserProfileMenu {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('JD')); // Open popover
    fireEvent.click(screen.getByText('Profile'));

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('logs out user when "Logout" button is clicked', () => {
    render(
      <MemoryRouter>
        <UserProfileMenu {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('JD')); // Open popover
    fireEvent.click(screen.getByText('Logout'));

    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });

  test('renders avatar image if provided', () => {
    const avatarUrl = 'https://via.placeholder.com/150';
    render(
      <MemoryRouter>
        <UserProfileMenu {...mockProps} avatarUrl={avatarUrl} />
      </MemoryRouter>
    );

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', avatarUrl);
  });

  test('renders initials if no avatar is provided', () => {
    render(
      <MemoryRouter>
        <UserProfileMenu {...mockProps} avatarUrl="" />
      </MemoryRouter>
    );

    const initials = screen.getByText('JD');
    expect(initials).toBeInTheDocument();
  });
});
