import { render, fireEvent, screen} from '@testing-library/react';
import App from './App';
import validationProperties from '../data/validationSettings';

const nameErrorText = validationProperties.find(item => item.errorName === 'name').errorText;
const surnameErrorText = validationProperties.find(item => item.errorName === 'surname').errorText;
const ageErrorText = validationProperties.find(item => item.errorName === 'age').errorText;
const cityErrorText = validationProperties.find(item => item.errorName === 'city').errorText;

describe('App component', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Renders the App component', () => {
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  test('Renders two Form components', () => {
    const formElements = screen.getAllByTestId('form');
    expect(formElements).toHaveLength(2);
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

describe('Switch toggler', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Renders the SwitchToggler component', () => {
    const switchTogglerElement = screen.getByTestId('switch-toggler');
    expect(switchTogglerElement).toBeInTheDocument();
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

describe('Form validation, errors', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Validates Name minimum characters, shows errors', () => {
    const nameInputElements = screen.getAllByTestId('memberName');

    nameInputElements.forEach((nameInputElement) => {

      fireEvent.change(nameInputElement, { target: { value: 'A' } });
      expect(nameInputElement).toHaveClass('error');

      const errorMessages = screen.getAllByTestId('form-error');
      expect(errorMessages).toHaveLength(2);

      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toHaveTextContent(nameErrorText);
      })
    });
    
  });

  test('Validates Surname maximum characters, shows errors', () => {
    const nameInputElements = screen.getAllByTestId('memberSurname');

    nameInputElements.forEach((nameInputElement) => {

      fireEvent.change(nameInputElement, { target: { value: 'ABCDEFGHIJKLMNOP' } });
      expect(nameInputElement).toHaveClass('error');

      const errorMessages = screen.getAllByTestId('form-error');
      expect(errorMessages).toHaveLength(2);

      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toHaveTextContent(surnameErrorText);
      })
    });
    
  });

  test('Validates Age max number, shows errors', () => {
    const nameInputElements = screen.getAllByTestId('memberAge');

    nameInputElements.forEach((nameInputElement) => {

      fireEvent.change(nameInputElement, { target: { value: '123' } });
      expect(nameInputElement).toHaveClass('error');

      const errorMessages = screen.getAllByTestId('form-error');
      expect(errorMessages).toHaveLength(2);

      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toHaveTextContent(ageErrorText);
      })
    });
    
  });

  test('Validates Age min number, shows errors', () => {
    const nameInputElements = screen.getAllByTestId('memberAge');

    nameInputElements.forEach((nameInputElement) => {

      fireEvent.change(nameInputElement, { target: { value: '-5' } });
      expect(nameInputElement).toHaveClass('error');

      const errorMessages = screen.getAllByTestId('form-error');
      expect(errorMessages).toHaveLength(2);

      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toHaveTextContent(ageErrorText);
      })
    });
    
  });

  test('Validates SelectField with "City" selected, shows error', () => {
    const selectFieldElements = screen.getAllByTestId('memberCity');

    selectFieldElements.forEach((selectFieldElement, index) => {

      fireEvent.click(selectFieldElement);
      
      const cityOptions = screen.getAllByText('City');

      cityOptions.forEach((cityElement) => {
        fireEvent.click(cityElement);
        console.log(cityElement.textContent);
      });
      
      const errorMessages = screen.getAllByTestId('form-error');
      expect(errorMessages).toHaveLength(2);
      
      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toHaveTextContent(cityErrorText);
      })

    });

  });

});