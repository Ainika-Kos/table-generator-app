import { render, fireEvent, screen} from '@testing-library/react';
import App from './App';

describe('Renders App components', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Renders the App component', () => {
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  test('Renders the SwitchToggler component', () => {
    const switchTogglerElement = screen.getByTestId('switch-toggler');
    expect(switchTogglerElement).toBeInTheDocument();
  });

  test('Renders the Form components', () => {
    const formElement = screen.getAllByTestId('form');
    expect(formElement).toHaveLength(2);
  });

  test('Renders the initial Table component', () => {
    const tableElement = screen.getByTestId('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('Renders the initial table copy Button component', () => {
    const copyButtonElement = screen.getByTestId('btn-copy');
    expect(copyButtonElement).toBeInTheDocument();
  });

});

describe('Switch toggler switches the theme', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Switch toggler switches the dark theme', () => {
    const switchTogglerInputElement = screen.getByTestId('switch-toggler-input');
    
    fireEvent.click(switchTogglerInputElement);

    const appElement = screen.getByTestId('app');

    expect(appElement).toHaveClass('dark-theme');
  });

  test('Switch toggler switches the light theme', () => {
    const switchTogglerInputElement = screen.getByTestId('switch-toggler-input');
    
    fireEvent.click(switchTogglerInputElement);
    fireEvent.click(switchTogglerInputElement);

    const appElement = screen.getByTestId('app');

    expect(appElement).not.toHaveClass('dark-theme');
  });


});