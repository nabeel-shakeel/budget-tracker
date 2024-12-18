import { MemoryRouter, useLocation } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SideBar } from './index';
import { routes } from '@routing';

// Mock the `useNavigate` hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(),
}));

describe('SideBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/analysis' });
  });

  const renderComponent = (isCollapsed: boolean) => {
    return render(
      <MemoryRouter>
        <SideBar isCollapsed={isCollapsed} />
      </MemoryRouter>
    );
  };

  test('renders collapsed sidebar with logo icon', () => {
    renderComponent(true);

    const logoIcon = screen.getByTestId('app-logo-icon');
    expect(logoIcon).toBeInTheDocument();

    const menu = screen.queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });

  test('renders expanded sidebar with logo and menu items', () => {
    renderComponent(false);

    const logoNameIcon = screen.getByTestId('app-logo-name-icon');
    expect(logoNameIcon).toBeInTheDocument();

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(4);

    expect(screen.getByText('Analysis')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('navigates to the correct route on menu item click', () => {
    renderComponent(false);

    fireEvent.click(screen.getByText('Expenses'));
    expect(mockNavigate).toHaveBeenCalledWith('/expenses');

    fireEvent.click(screen.getByText('Users'));
    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });

  test('logs out and navigates to sign-in route on logout click', () => {
    renderComponent(false);

    fireEvent.click(screen.getByText('Logout'));
    expect(mockNavigate).toHaveBeenCalledWith(routes.SIGN_IN);
  });

  test('sets correct menu item as selected based on pathname', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/users' });

    renderComponent(false);

    const usersMenuItem = screen.getByText('Users').closest('li');
    expect(usersMenuItem).toHaveClass('ant-menu-item-selected');
  });
});
