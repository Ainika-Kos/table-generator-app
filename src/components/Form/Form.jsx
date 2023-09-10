import './Form.sass';
import { useState, useEffect } from 'react';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Button from '../Button/Button';

const Form = ({ addMemberData, handleAddMemberChange, handleAddMemberSubmit, isControlledInput, buttonText }) => {

  const [formisValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {

      let newErrors = {};

      if (addMemberData.memberName && addMemberData.memberName.length < 2) {
        newErrors = { ...newErrors, name : 'Name should be at least 2 characters long'};
      }
      
      if (addMemberData.memberSurname && addMemberData.memberSurname.length < 2) {
        newErrors = { ...newErrors, surname : 'Surname should be at least 2 characters long'};
      }

      if (addMemberData.memberAge && addMemberData.memberAge < 1) {
        newErrors = { ...newErrors, age : 'Minimum age is 1 year'};
      }
      
      if (addMemberData.memberCity && addMemberData.memberCity === 'City') {
        newErrors = { ...newErrors, city : 'Please select a city'};
      }

      setErrors(newErrors);

      const emptyForm = !!addMemberData.memberName && !!addMemberData.memberSurname && !!addMemberData.memberAge && !!addMemberData.memberCity;
      const isValidForm = Object.keys(newErrors).length === 0 && emptyForm;

      setFormIsValid(isValidForm);
    };

    validateForm();

  }, [addMemberData]);

  return (
    <form className='App__form'>
      <InputField
        name='memberName'
        type='text'
        placeholder='Name'
        onChange={handleAddMemberChange}
        value={addMemberData.memberName}
        isControlledInput={isControlledInput}
      />
      <InputField
        name='memberSurname'
        type='text'
        placeholder='Surname'
        onChange={handleAddMemberChange}
        value={addMemberData.memberSurname}
        isControlledInput={isControlledInput}
      />
      <InputField
        name='memberAge'
        type='number'
        placeholder='Age'
        onChange={handleAddMemberChange}
        value={addMemberData.memberAge}
        isControlledInput={isControlledInput}
      />
      <SelectField
        name='memberCity'
        placeholder='City'
        onChange={handleAddMemberChange}
        value={addMemberData.memberCity}
        isControlledInput={isControlledInput}
      />
        {errors.name ? <p className='App__form__error'> {errors.name}</p> : null}
        {errors.surname ? <p className='App__form__error'> {errors.surname} </p> : null}
        {errors.city ? <p className='App__form__error'> {errors.city}</p> : null}
        {errors.age ? <p className='App__form__error'> {errors.age} </p> : null}
      <Button
        buttonType='submit'
        buttonClass='btn'
        buttonText={buttonText}
        buttonDisabled={!formisValid}
        onClick={handleAddMemberSubmit}
      />
    </form>
  );
};

export default Form;