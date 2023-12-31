import { render, fireEvent, screen, act} from '@testing-library/react';
import App from './App';
import validationProperties from '../data/validationSettings';
import toastMessages from '../data/toastMessages';

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

    expect(document.body.classList.contains('dark-theme')).toBe(false);
    
    fireEvent.click(switchTogglerInputElement);

    expect(document.body.classList.contains('dark-theme')).toBe(true);

  });

  test('Switch toggler switches the light theme', () => {
    const switchTogglerInputElement = screen.getByTestId('switch-toggler-input');
    
    fireEvent.click(switchTogglerInputElement);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    fireEvent.click(switchTogglerInputElement);

    expect(document.body.classList.contains('dark-theme')).toBe(false);
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

  test('Validates SelectField with "City" selected, shows errors', () => {
    const selectFieldElements = screen.getAllByTestId('memberCity');

    selectFieldElements.forEach((selectFieldElement) => {

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

describe('Form validation, without errors', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Validates Name, does not shows errors', () => {
    const nameInputElements = screen.getAllByTestId('memberName');

    nameInputElements.forEach((nameInputElement) => {

      fireEvent.change(nameInputElement, { target: { value: 'Batman' } });
      expect(nameInputElement).not.toHaveClass('error');

      const errorMessagesWrappers = screen.getAllByTestId('form-error-wrapper');
      expect(errorMessagesWrappers).toHaveLength(2);

      errorMessagesWrappers.forEach((errorMessagesWrapper) => {
        
        expect(errorMessagesWrapper).toHaveTextContent('');
      });
    });
  });

  test('Validates Surname, does not shows errors', () => {
    const surnameInputElements = screen.getAllByTestId('memberSurname');

    surnameInputElements.forEach((surnameInputElement) => {

      fireEvent.change(surnameInputElement, { target: { value: 'Stackham' } });
      expect(surnameInputElement).not.toHaveClass('error');

      const errorMessagesWrappers = screen.getAllByTestId('form-error-wrapper');
      expect(errorMessagesWrappers).toHaveLength(2);

      errorMessagesWrappers.forEach((errorMessagesWrapper) => {

        expect(errorMessagesWrapper).toHaveTextContent('');
      });
    });
  });

  test('Validates Age, does not shows errors', () => {
    const ageInputElements = screen.getAllByTestId('memberAge');

    ageInputElements.forEach((ageInputElement) => {

      fireEvent.change(ageInputElement, { target: { value: '28' } });
      expect(ageInputElement).not.toHaveClass('error');

      const errorMessagesWrappers = screen.getAllByTestId('form-error-wrapper');
      expect(errorMessagesWrappers).toHaveLength(2);

      errorMessagesWrappers.forEach((errorMessagesWrapper) => {

        expect(errorMessagesWrapper).toHaveTextContent('');
      });
    });
  });

  test('Validates SelectField with "Liepāja" selected, does not show errors', () => {
    const selectFieldElements = screen.getAllByTestId('memberCity');

    selectFieldElements.forEach((selectFieldElement) => {

      fireEvent.click(selectFieldElement);
      
      const cityOptions = screen.getAllByText('Liepāja');

      cityOptions.forEach((cityElement) => {
        fireEvent.click(cityElement);
        console.log(cityElement.textContent);
      });
      
      const errorMessagesWrappers = screen.getAllByTestId('form-error-wrapper');
      expect(errorMessagesWrappers).toHaveLength(2);

      errorMessagesWrappers.forEach((errorMessagesWrapper) => {
        expect(errorMessagesWrapper).toHaveTextContent('');
      });
    });
  });
});

describe('Form submission', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Submits the form with valid data and adds data to the table', () => {

    const nameInputElements = screen.getAllByTestId('memberName');
    const surnameInputElements = screen.getAllByTestId('memberSurname');
    const ageInputElements = screen.getAllByTestId('memberAge');
    const citySelectElements = screen.getAllByTestId('memberCity');
    const submitButtonElements = screen.getAllByTestId('btn-submit');

    nameInputElements.forEach((nameInputElement) => {
      fireEvent.change(nameInputElement, { target: { value: 'Sonia' } });
    });

    surnameInputElements.forEach((surnameInputElement) => {
      fireEvent.change(surnameInputElement, { target: { value: 'Lopata' } });
    });

    ageInputElements.forEach((ageInputElement) => {
      fireEvent.change(ageInputElement, { target: { value: '43' } });
    });

    citySelectElements.forEach((citySelectElement) => {
        fireEvent.click(citySelectElement);
        const cityOptions = screen.getAllByText('Ogre');
        cityOptions.forEach((cityElement) => {
          fireEvent.click(cityElement);
        });
    });

    fireEvent.click(submitButtonElements[0]);

    const tableRows = screen.getAllByTestId('table-row');
    expect(tableRows).toHaveLength(1);

    const tableRowCells = tableRows[0].querySelectorAll('td');
    expect(tableRowCells[0]).toHaveTextContent('Sonia');
    expect(tableRowCells[1]).toHaveTextContent('Lopata');
    expect(tableRowCells[2]).toHaveTextContent('43');
    expect(tableRowCells[3]).toHaveTextContent('Ogre');
  });
});

describe('Modal form actions', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Opens Modal form on edit button click', () => {
    const editBtn = screen.getByTestId('btn-edit');
    fireEvent.click(editBtn);

    const modalTitle = screen.getByText('Editing form');
    const modalSubmitButton = screen.getByText('Agree');

    expect(modalTitle).toBeInTheDocument();
    expect(modalSubmitButton).toBeInTheDocument();
  });

  test('Closes Modal form on close button click', () => {
    const editBtn = screen.getByTestId('btn-edit');
    fireEvent.click(editBtn);

    const modalTitle = screen.getByText('Editing form');
    const modalSubmitButton = screen.getByText('Agree');

    expect(modalTitle).toBeInTheDocument();
    expect(modalSubmitButton).toBeInTheDocument();

    const closeModalButton = screen.getByTestId('form-close');
    fireEvent.click(closeModalButton);

    expect(modalTitle).not.toBeInTheDocument();
    expect(modalSubmitButton).not.toBeInTheDocument();
  });
});

describe('Table actions', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Makes table copy', () => {
    const copyBtn = screen.getByTestId('btn-copy');
    
    fireEvent.click(copyBtn);
    const copiedTable = screen.queryByTestId('copied-table');
    expect(copiedTable).toBeInTheDocument();

    fireEvent.click(copyBtn);
    const copiedTables = screen.getAllByTestId('copied-table');
    expect(copiedTables).toHaveLength(2);

    fireEvent.click(copyBtn);
    const newCopiedTables = screen.getAllByTestId('copied-table');
    expect(newCopiedTables).toHaveLength(3);
  });

  test('Deletes a table', () => {
    const deleteBtns = screen.getAllByTestId('btn-delete');
    expect(deleteBtns).toHaveLength(4);

    fireEvent.click(deleteBtns[3]);

    const newCopiedTables = screen.getAllByTestId('copied-table');
    expect(newCopiedTables).toHaveLength(2);
  });
});

describe('Table row data actions', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Saves edited member data', () => {
    const editBtn = screen.getAllByTestId('btn-edit');
    fireEvent.click(editBtn[0]);

    const modalTitle = screen.getByText('Editing form');
    const modalSubmitButton = screen.getByText('Agree');

    expect(modalTitle).toBeInTheDocument();
    expect(modalSubmitButton).toBeInTheDocument();

    const modalForm = screen.getByTestId('modal-form');
    const nameInput = modalForm.querySelector('[data-testid="memberName"]');
    const ageInput = modalForm.querySelector('[data-testid="memberAge"]');
    const saveButton = modalForm.querySelector('[data-testid="btn-submit"]');
    
    fireEvent.change(nameInput, { target: { value: 'Lucky' } });
    fireEvent.change(ageInput, { target: { value: '69' } });
    fireEvent.click(saveButton);

    const tableRows = screen.getAllByTestId('table-row');
    const tableRowCells = tableRows[0].querySelectorAll('td');
    
    expect(tableRowCells[0]).toHaveTextContent('Lucky');
    expect(tableRowCells[2]).toHaveTextContent('69');
  });

  test('Deletes member data', () => {

    const tableRows = screen.getAllByTestId('table-row');
    const tableRowCells = tableRows[0].querySelectorAll('td');

    expect(tableRowCells[0]).toHaveTextContent('Lucky');
    expect(tableRowCells[1]).toHaveTextContent('Lopata');
    expect(tableRowCells[2]).toHaveTextContent('69');
    expect(tableRowCells[3]).toHaveTextContent('Ogre');

    expect(tableRows.length).toBeGreaterThan(0);

    const deleteRowBtns = screen.getAllByTestId('btn-delete-row');
    console.log(deleteRowBtns.length);

    deleteRowBtns.forEach((deleteRowBtn) => {
      fireEvent.click(deleteRowBtn);
    });

    const remainingTableRows = screen.queryAllByTestId('table-row');
    expect(remainingTableRows.length).toBe(0);
  });
});

describe('Toast messages', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Shows success message, when member data is added', () => {
    const nameInputElements = screen.getAllByTestId('memberName');
    const surnameInputElements = screen.getAllByTestId('memberSurname');
    const ageInputElements = screen.getAllByTestId('memberAge');
    const citySelectElements = screen.getAllByTestId('memberCity');
    const submitButtonElements = screen.getAllByTestId('btn-submit');

    nameInputElements.forEach((nameInputElement) => {
      fireEvent.change(nameInputElement, { target: { value: 'Sonia' } });
    });

    surnameInputElements.forEach((surnameInputElement) => {
      fireEvent.change(surnameInputElement, { target: { value: 'Lopata' } });
    });

    ageInputElements.forEach((ageInputElement) => {
      fireEvent.change(ageInputElement, { target: { value: '43' } });
    });

    citySelectElements.forEach((citySelectElement) => {
      fireEvent.click(citySelectElement);
      const cityOptions = screen.getAllByText('Ogre');
      cityOptions.forEach((cityElement) => {
        fireEvent.click(cityElement);
      });
    });

    fireEvent.click(submitButtonElements[0]);

    const tableRows = screen.getAllByTestId('table-row');
    expect(tableRows).toHaveLength(1);

    const tableRowCells = tableRows[0].querySelectorAll('td');
    expect(tableRowCells[0]).toHaveTextContent('Sonia');
    expect(tableRowCells[1]).toHaveTextContent('Lopata');
    expect(tableRowCells[2]).toHaveTextContent('43');
    expect(tableRowCells[3]).toHaveTextContent('Ogre');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const toastMessage = screen.getByTestId('toast-message');
    const toastMessageText = toastMessages.find((message) => message.key === 'addMemberSuccess');
    expect(toastMessage).toBeInTheDocument();
    expect(toastMessage).toHaveTextContent(toastMessageText.message);
  });

  test('Shows success message on copying table', () => {
    
    const copyBtn = screen.getAllByTestId('btn-copy');

    fireEvent.click(copyBtn[0]);

    const newCopiedTables = screen.getAllByTestId('copied-table');
    expect(newCopiedTables).toHaveLength(3);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const toastMessage = screen.getByTestId('toast-message');
    const toastMessageText = toastMessages.find((message) => message.key === 'copyTableSuccess');
    expect(toastMessage).toBeInTheDocument();
    expect(toastMessage).toHaveTextContent(toastMessageText.message);
  });

  test('Shows error message on deleting initial table', () => {
    
    const deleteBtns = screen.getAllByTestId('btn-delete');
    expect(deleteBtns).toHaveLength(4);

    fireEvent.click(deleteBtns[0]);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const toastMessage = screen.getByTestId('toast-message');
    const toastMessageText = toastMessages.find((message) => message.key === 'unableToDeleteTable');
    expect(toastMessage).toBeInTheDocument();
    expect(toastMessage).toHaveTextContent(toastMessageText.message);
  });

  test('Shows info message on modal closing without saving data', () => {

    const editBtn = screen.getAllByTestId('btn-edit');
    fireEvent.click(editBtn[0]);

    const modalForm = screen.getByTestId('modal-form');
    expect(modalForm).toBeInTheDocument();
    const modalClose = modalForm.querySelector('[data-testid="form-close"]');
    fireEvent.click(modalClose);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const toastMessage = screen.getByTestId('toast-message');
    const toastMessageText = toastMessages.find((message) => message.key === 'noChangesInfo');
    expect(toastMessage).toBeInTheDocument();
    expect(toastMessage).toHaveTextContent(toastMessageText.message);
  });
});