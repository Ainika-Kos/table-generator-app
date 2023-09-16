import './Form.sass';
import { useState, useEffect } from 'react';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Button from '../Button/Button';
import deleteIcon from '../../assets/deleteIcon.svg'
import validationProperties from '../../data/validationSettings';

const Form = ({ addMemberData, handleAddMemberChange, handleAddMemberSubmit, isControlledInput, buttonText, isEditForm, handleCloseModal }) => {

  const [formisValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {

      let newErrors = {};

      if (addMemberData.memberName &&
        (addMemberData.memberName.length < validationProperties.find(item => item.errorName === 'name').minCharacters || addMemberData.memberName.length > validationProperties.find(item => item.errorName === 'name').maxCharacters)) {
        newErrors = { ...newErrors, name: validationProperties.find(item => item.errorName === 'name').errorText };
      }
      
      if (addMemberData.memberSurname &&
        (addMemberData.memberSurname.length < validationProperties.find(item => item.errorName === 'surname').minCharacters || addMemberData.memberSurname.length > validationProperties.find(item => item.errorName === 'surname').maxCharacters)) {
        newErrors = { ...newErrors, surname: validationProperties.find(item => item.errorName === 'surname').errorText };
      }

      if (addMemberData.memberAge &&
        (addMemberData.memberAge < validationProperties.find(item => item.errorName === 'age').minAge || addMemberData.memberAge > validationProperties.find(item => item.errorName === 'age').maxAge)) {
        newErrors = { ...newErrors, age: validationProperties.find(item => item.errorName === 'age').errorText };
      }
      
      if (addMemberData.memberCity && addMemberData.memberCity === 'City') {
        newErrors = { ...newErrors, city: validationProperties.find(item => item.errorName === 'city').errorText };
      }

      setErrors(newErrors);

      const emptyForm = !!addMemberData.memberName && !!addMemberData.memberSurname && !!addMemberData.memberAge && !!addMemberData.memberCity;
      const isValidForm = Object.keys(newErrors).length === 0 && emptyForm;

      setFormIsValid(isValidForm);
    };

    validateForm();

  }, [addMemberData]);

  return (
    <form className='App__form' data-testid='form'>
      {isEditForm && (<h2 className='App__form__title'>Editing form</h2>)}
      {isEditForm && (
        <span className='App__form__close' onClick={handleCloseModal} data-testid='form-close'>
          <img src={deleteIcon} alt="Close Icon" />
          </span>
      )}
      <InputField
        name='memberName'
        type='text'
        placeholder='Name'
        onChange={handleAddMemberChange}
        value={addMemberData.memberName}
        isControlledInput={isControlledInput}
        errorStyle={errors.name? 'error': ''}
      />
      <InputField
        name='memberSurname'
        type='text'
        placeholder='Surname'
        onChange={handleAddMemberChange}
        value={addMemberData.memberSurname}
        isControlledInput={isControlledInput}
        errorStyle={errors.surname ? 'error' : ''}
      />
      <InputField
        name='memberAge'
        type='number'
        placeholder='Age'
        onChange={handleAddMemberChange}
        value={addMemberData.memberAge}
        isControlledInput={isControlledInput}
        errorStyle={errors.age ? 'error' : ''}
      />
      <SelectField
        name='memberCity'
        placeholder='City'
        onChange={handleAddMemberChange}
        value={addMemberData.memberCity}
        isControlledInput={isControlledInput}
        errorStyle={errors.city ? 'error' : ''}
      />
      <div className='App__form__error-wrapper' data-testid='form-error-wrapper' >
        {Object.keys(errors).map((key) => (
          <p className='App__form__error-text' key={key} data-testid='form-error'>{errors[key]}</p>
        ))}
      </div>
      <Button
        buttonType='submit'
        buttonClass='btn'
        buttonText={buttonText}
        buttonDisabled={!formisValid}
        onClick={handleAddMemberSubmit}
        testId='btn-submit'
      />
    </form>
  );
};

export default Form;